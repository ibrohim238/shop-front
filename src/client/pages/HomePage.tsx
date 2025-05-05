// src/pages/HomePage.tsx
import { useState, useEffect, ReactElement } from 'react';
import { Link, useSearchParams } from 'react-router';
import PaginatorComponent from '@/components/PaginatorComponent.tsx';
import SidebarCategories from '@/components/SidebarCategories.tsx';
import { getProducts } from '@/client/services/ProductService.ts';
import type { Product } from '@/models/Product.ts';
import type { PaginationMeta } from '@/types/Response.ts';
import type { FilterParams } from '@/types/Params.ts';

export default function HomePage(): ReactElement {
    const [products, setProducts] = useState<Product[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();

    // читаем выбранную категорию из query-параметров
    const categoryIdParam = searchParams.get('category');
    const filter: FilterParams = {};
    if (categoryIdParam) {
        filter.category_id = Number(categoryIdParam);
    }

    // при смене категории сбрасываем на первую страницу
    useEffect(() => {
        setCurrentPage(1);
    }, [categoryIdParam]);

    // загружаем товары при смене страницы или категории
    useEffect(() => {
        setLoading(true);
        getProducts(currentPage, 15, filter)
            .then(pagination => {
                setProducts(pagination.data);
                setMeta(pagination.meta);
            })
            .finally(() => setLoading(false));
    }, [currentPage, categoryIdParam]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="text-gray-500">Загрузка...</span>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto p-6 flex gap-6">
                {/* Левая панель фильтра по категориям */}
                <SidebarCategories />

                {/* Секция товаров */}
                <div className="flex-grow">
                    <h1 className="text-3xl font-semibold mb-6">Товары</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {products.map(p => (
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
                        <PaginatorComponent
                            currentPage={currentPage}
                            lastPage={meta.last_page}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
