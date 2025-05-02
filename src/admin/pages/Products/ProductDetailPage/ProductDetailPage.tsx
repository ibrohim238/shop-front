// src/admin/pages/ProductDetailPage.tsx
import { ReactElement, useState } from 'react';
import {useParams, useNavigate} from 'react-router';
import CardProduct from '@/admin/pages/Products/ProductDetailPage/CardProduct.tsx';
import LoadingComponent from '@/components/LoadingComponent.tsx';
import ErrorComponent from '@/components/ErrorComponent.tsx';
import { useProductDetail } from '@/admin/pages/Products/ProductDetailPage/useProductDetail.ts';
import FormProduct from "@/admin/pages/Products/ProductDetailPage/FormProduct.tsx";
import {Product} from "@/models/Product.ts";

export default function AdminProductDetailPage(): ReactElement {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const navigate = useNavigate();
    const { product, setProduct, loading, error } = useProductDetail(productId);
    const [editMode, setEditMode] = useState(false);

    const redirect =  () => navigate('/admin/products');

    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent message={error} onRetry={redirect} />;
    if (!product) return <ErrorComponent message={"Продук не существует"} onRetry={redirect} />;

    return (
        <div className="container mx-auto p-6">
            <button onClick={() => navigate('/admin/products')} className="mb-4 text-blue-600 hover:underline">
                ← Назад к списку
            </button>
            {
                editMode
                    ? <FormProduct product={product} success={(product:Product) => {
                        setProduct(product);
                        setEditMode(false);
                    }}/>
                    : <CardProduct product={product} />
            }
            <button
                onClick={() => setEditMode(true)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Редактировать
            </button>
        </div>
    );
}
