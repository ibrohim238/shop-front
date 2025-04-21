// src/pages/OrderDetailPage.tsx
import { useState, useEffect, ReactElement } from 'react';
import { useParams, Link } from 'react-router';
import { getOrderById } from '@/client/services/OrderService.ts';
import type { Order } from '@/models/Order.ts';

export default function OrderDetailPage(): ReactElement {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('Не указан ID заказа');
            setLoading(false);
            return;
        }
        getOrderById(Number(id))
            .then(setOrder)
            .catch(() => setError('Не удалось загрузить заказ'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <span className="text-gray-500">Загрузка заказа...</span>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="container mx-auto p-6">
                <p className="text-red-500 text-center">
                    {error ?? 'Заказ не найден'}
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto p-6">
                <Link
                    to="/orders"
                    className="inline-block mb-6 text-blue-600 hover:underline transition"
                >
                    ← Вернуться к списку заказов
                </Link>

                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Заказ #{order.id}</h1>
                    <p className="mb-2">
                        <span className="font-medium">Статус:</span> {order.status}
                    </p>
                    <p className="mb-4">
                        <span className="font-medium">Сумма:</span>{' '}
                        {order.amount.toLocaleString('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                        })}
                    </p>

                    <h2 className="text-xl font-semibold mb-2">Товары в заказе</h2>
                    <ul className="space-y-4 mb-4">
                        {order.items.map((item) => (
                            <li
                                key={item.product.id}
                                className="flex items-center justify-between"
                            >
                                <Link
                                    to={`/products/${item.product.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    {item.product.name}
                                </Link>
                                <span>
                  {item.quantity} ×{' '}
                                    {item.product.price.toLocaleString('ru-RU', {
                                        style: 'currency',
                                        currency: 'RUB',
                                    })}
                </span>
                                <span className="font-medium">
                  {(item.product.price * item.quantity).toLocaleString('ru-RU', {
                      style: 'currency',
                      currency: 'RUB',
                  })}
                </span>
                            </li>
                        ))}
                    </ul>

                    {order.coupon && (
                        <div className="mb-4">
                            <p>
                                <span className="font-medium">Промокод:</span>{' '}
                                {order.coupon.code} (
                                {order.coupon.amount.toLocaleString('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB',
                                })}
                                )
                            </p>
                        </div>
                    )}

                    <div className="text-sm text-gray-500 space-y-1">
                        <p>
                            <span className="font-medium">Создан:</span>{' '}
                            {order.created_at.toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                        <p>
                            <span className="font-medium">Обновлён:</span>{' '}
                            {order.updated_at.toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
