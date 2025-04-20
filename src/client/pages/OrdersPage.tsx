// src/pages/OrdersPage.tsx
import {useState, useEffect, ReactElement} from 'react';
import {Link} from 'react-router';
import MainLayout from '@/layouts/MainLayout.tsx';
import Paginator from '@/components/Paginator.tsx';
import {getOrders} from '@/client/services/OrderService.ts';
import type {Order} from '@/models/Order.ts';
import type {PaginationMeta} from '@/models/Pagination.ts';

export default function OrdersPage(): ReactElement {
    const [orders, setOrders] = useState<Order[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const loadPage = (page: number) => {
        setLoading(true);
        setError(null);
        getOrders(page)
            .then(paginated => {
                setOrders(paginated.data);
                setMeta(paginated.meta);
                setCurrentPage(page);
            })
            .catch(() => {
                setError('Не удалось загрузить заказы');
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
                <div className="flex items-center justify-center h-64">
                    <span className="text-gray-500">Загрузка заказов...</span>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="container mx-auto p-6">
                    <p className="text-red-500 text-center">{error}</p>
                </div>
            </MainLayout>
        );
    }

    if (!meta || orders.length === 0) {
        return (
            <MainLayout>
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-semibold mb-6">Мои заказы</h1>
                    <p className="text-gray-600">Нет доступных заказов.</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Мои заказы</h1>
                <div className="space-y-4">
                    {orders.map(order => (
                        <div
                            key={order.id}
                            className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                        >
                            <div>
                                <p className="font-medium">Заказ #{order.id}</p>
                                <p className="text-gray-600">Статус: {order.status}</p>
                                <p className="text-gray-600">
                                    Сумма:{' '}
                                    {order.amount.toLocaleString('ru-RU', {
                                        style: 'currency',
                                        currency: 'RUB',
                                    })}
                                </p>
                            </div>
                            <Link
                                to={`/orders/${order.id}`}
                                className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Подробнее
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <Paginator
                        currentPage={currentPage}
                        lastPage={meta.last_page}
                        onPageChange={loadPage}
                    />
                </div>
            </div>
        </MainLayout>
    );
}