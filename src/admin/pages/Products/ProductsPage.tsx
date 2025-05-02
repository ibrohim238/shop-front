// src/admin/pages/ProductsPage.tsx
import { useState, useEffect, ReactElement } from 'react';
import { Link } from 'react-router';
import { getProducts } from '@/admin/services/ProductService.ts';
import type { Product } from '@/models/Product.ts';
import PaginatorComponent from '@/components/PaginatorComponent.tsx';
import type { PaginationMeta } from '@/models/Pagination.ts';

export default function  ProductsPage(): ReactElement {
    const [products, setProducts] = useState<Product[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        getProducts(page)
            .then(pagination => {
                setProducts(pagination.data);
                setMeta(pagination.meta);
            })
            .catch(err => {
                console.error(err);
                setError('Не удалось загрузить список продуктов');
            })
            .finally(() => setLoading(false));
    }, [page]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <span className="text-gray-500">Загрузка продуктов...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Управление товарами</h1>
                <Link
                    to="/admin/products/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Добавить товар
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Название</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Цена</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Кол-во</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Дата создания</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(p => (
                        <tr key={p.id} className="border-t">
                            <td className="px-4 py-2 text-sm text-gray-800">{p.id}</td>
                            <td className="px-4 py-2 text-sm text-gray-800">{p.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-800 text-right">
                                {p.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800 text-right">
                                {p.quantity ?? '—'}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                                {new Date(p.created_at).toLocaleDateString('ru-RU')}
                            </td>
                            <td className="px-4 py-2 text-center text-sm">
                                <Link
                                    to={`/admin/products/${p.id}`}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm"
                                >
                                    Посмотреть
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {meta && (
                <div className="mt-6">
                    <PaginatorComponent
                        currentPage={page}
                        lastPage={meta.last_page}
                        onPageChange={setPage}
                    />
                </div>
            )}
        </div>
    );
}
