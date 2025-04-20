// src/pages/HomePage.tsx
import { useState, useEffect, ReactElement } from 'react';
import { Link } from 'react-router';
import MainLayout from '@/layouts/MainLayout';
import { getProducts } from '@/services/ProductService';
import type { Product } from '@/models/Product';
import Paginator from '@/components/Paginator';

export default function HomePage(): ReactElement {
    const [products, setProducts] = useState<Product[]>([]);
    const [meta, setMeta] = useState<{ last_page: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const loadPage = (page: number) => {
        setLoading(true);
        getProducts(page)
            .then((pagination) => {
                setProducts(pagination.data);
                setMeta(pagination.meta);
                setCurrentPage(page);
            })
            .catch((error) => {
                console.error('Failed to fetch products', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadPage(1);
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-screen">
                    <span className="text-gray-500">Загрузка...</span>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-8">Товары</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <Link
                            key={p.id}
                            to={`/products/${p.id}`}
                            className="group block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {p.medias[0]?.url ? (
                                <img
                                    src={p.medias[0].url}
                                    alt={p.name}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400">Нет изображения</span>
                                </div>
                            )}
                            <div className="p-4">
                                <h2 className="text-xl font-medium mb-2">{p.name}</h2>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {p.description}
                                </p>
                                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    {p.price.toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    })}
                  </span>
                                    <span className="text-sm text-gray-500">
                    {p.quantity ?? 'N/A'} шт.
                  </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {meta && (
                    <Paginator
                        currentPage={currentPage}
                        lastPage={meta.last_page}
                        onPageChange={loadPage}
                    />
                )}
            </div>
        </MainLayout>
    );
}
