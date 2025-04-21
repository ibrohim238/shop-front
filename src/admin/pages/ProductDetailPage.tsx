// src/admin/pages/ProductDetailPage.tsx
import type { ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router';
import ProductDetailCard from '@/admin/components/ProductDetailCard';
import { useProductDetail } from '@/admin/hooks/useProductDetail';
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';

export default function AdminProductDetailPage(): ReactElement {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const navigate = useNavigate();

    const { product, loading, error } = useProductDetail(productId);

    if (loading) {
        return <LoadingComponent />;
    }
    if (error) {
        return <ErrorComponent message={error} onRetry={() => navigate('/admin/products')} />;
    }

    // После обработки состояний product всегда определён, нет возврата null
    return (
        <div className="container mx-auto p-6">
            <button
                onClick={() => navigate('/admin/products')}
                className="mb-4 text-blue-600 hover:underline"
            >
                ← Назад к списку
            </button>
            <ProductDetailCard product={product!} />
        </div>
    );
}