// src/admin/pages/ProductDetailPage.tsx
import { ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router';
import ProductDetailCard from '@/admin/components/ProductDetailCard';
import { useProductDetail } from '@/admin/hooks/useProductDetail';

export default function AdminProductDetailPage(): ReactElement {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const navigate = useNavigate();

    const { product, loading, error } = useProductDetail(productId);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <span className="text-gray-500">Загрузка...</span>
            </div>
        );
    }
    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => navigate('/admin/products')}
                    className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Вернуться к списку
                </button>
            </div>
        );
    }
    if (!product) {
        return null;
    }

    return (
        <div className="container mx-auto p-6">
            <button
                onClick={() => navigate('/admin/products')}
                className="mb-4 text-blue-600 hover:underline"
            >
                ← Назад к списку
            </button>
            <ProductDetailCard product={product} />
        </div>
    );
}