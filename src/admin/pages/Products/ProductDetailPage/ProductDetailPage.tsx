import { ReactElement, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import CardProduct from '@/admin/pages/Products/ProductDetailPage/CardProduct';
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';
import { useProductDetail } from '@/admin/pages/Products/ProductDetailPage/useProductDetail';
import FormProduct from "@/admin/pages/Products/ProductDetailPage/FormProduct";
import { Product } from "@/models/Product";
import { deleteProduct } from '@/admin/services/ProductService';

export default function AdminProductDetailPage(): ReactElement {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const navigate = useNavigate();
    const { product, setProduct, loading, error } = useProductDetail(productId);
    const [editMode, setEditMode] = useState(false);

    const redirect = () => navigate('/admin/products');

    const handleDelete = async () => {
        if (!window.confirm('Вы действительно хотите удалить этот продукт?')) {
            return;
        }
        try {
            await deleteProduct(productId);
            navigate('/admin/products');
        } catch (err) {
            console.error(err);
            alert('Ошибка при удалении продукта');
        }
    };

    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent message={error} onRetry={redirect} />;
    if (!product) return <ErrorComponent message="Продукт не существует" onRetry={redirect} />;

    return (
        <div className="container mx-auto p-6">
            <button onClick={() => navigate('/admin/products')} className="mb-4 text-blue-600 hover:underline">
                ← Назад к списку
            </button>
            {editMode
                ? <FormProduct product={product} success={(updatedProduct: Product) => {
                    setProduct(updatedProduct);
                    setEditMode(false);
                }} />
                : <CardProduct product={product} />
            }
            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => setEditMode(true)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Редактировать
                </button>
                <button
                    onClick={handleDelete}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Удалить
                </button>
            </div>
        </div>
    );
}