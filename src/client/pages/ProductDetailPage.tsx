// src/pages/ProductDetailPage.tsx
import { useState, useEffect, ReactElement } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import MainLayout from '@/layouts/MainLayout.tsx';
import { getProductById } from '@/client/services/ProductService.ts';
import { addToCart } from '@/client/services/CartService.ts';
import type { Product } from '@/models/Product.ts';

export default function ProductDetailPage(): ReactElement {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProductById(Number(id))
            .then(setProduct)
            .catch(() => setError('Не удалось загрузить продукт'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleAddToCart = async (): Promise<void> => {
        if (!product) return;
        setAdding(true);
        try {
            await addToCart(product.id, 1);
            navigate('/cart');
        } catch(e) {
            console.log(e);
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-64">
                    <span className="text-gray-500">Загрузка...</span>
                </div>
            </MainLayout>
        );
    }

    if (error || !product) {
        return (
            <MainLayout>
                <div className="container mx-auto p-6">
                    <p className="text-red-500 text-center">{error ?? 'Продукт не найден'}</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="container mx-auto p-6">
                <Link
                    to="/"
                    className="inline-block mb-6 text-blue-600 hover:underline transition"
                >
                    ← Вернуться на главную
                </Link>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Изображение */}
                    {product.medias.length > 0 && product.medias[0].url ? (
                        <img
                            src={product.medias[0].url}
                            alt={product.name}
                            className="w-full h-80 object-cover"
                        />
                    ) : (
                        <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">Нет изображения</span>
                        </div>
                    )}

                    {/* Информация */}
                    <div className="p-8 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                            <p className="text-gray-700 mb-6">{product.description}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-baseline justify-between">
                <span className="text-4xl font-extrabold text-green-600">
                  {product.price.toLocaleString('ru-RU', {
                      style: 'currency',
                      currency: 'RUB',
                  })}
                </span>
                                <span className="text-sm text-gray-500">
                  {product.quantity !== null ? `${product.quantity} шт.` : 'N/A'}
                </span>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={adding}
                                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {adding ? 'Добавляем...' : 'Добавить в корзину'}
                            </button>

                            <div className="text-sm text-gray-500">
                                <p>
                                    <span className="font-medium">Создано:</span>{' '}
                                    {new Date(product.created_at).toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>
                                <p>
                                    <span className="font-medium">Обновлено:</span>{' '}
                                    {new Date(product.updated_at).toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
