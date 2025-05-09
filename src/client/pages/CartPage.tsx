// src/pages/CartPage.tsx
import { useState, useEffect, ReactElement } from 'react';
import { Link, useNavigate } from 'react-router';
import MainLayout from '@/layouts/MainLayout.tsx';
import Paginator from '@/components/Paginator.tsx';
import {
    getCarts,
    removeFromCart,
    updateCartItem
} from '@/client/services/CartService.ts';
import { createOrder } from '@/client/services/OrderService.ts';
import type { Cart } from '@/models/Cart.ts';
import type { PaginationMeta } from '@/models/Pagination.ts';

export default function CartPage(): ReactElement {
    const navigate = useNavigate();

    const [items, setItems] = useState<Cart[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordering, setOrdering] = useState(false);

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const loadPage = (page: number) => {
        setLoading(true);
        setError(null);
        getCarts(page)
            .then(paginated => {
                setItems(paginated.data);
                setMeta(paginated.meta);
                setCurrentPage(page);
                setSelectedIds([]);
            })
            .catch(() => setError('Не удалось загрузить корзину'))
            .finally(() => setLoading(false));
    };

    const handleRemove = async (cartId: number) => {
        setLoading(true);
        try {
            await removeFromCart(cartId);
            loadPage(currentPage);
        } catch {
            setError('Не удалось удалить элемент');
            setLoading(false);
        }
    };

    const handleQuantityChange = async (
        cartId: number,
        newQty: number
    ) => {
        if (newQty < 1) return;
        try {
            const updated = await updateCartItem(cartId, newQty);
            setItems(items.map(i => (i.id === cartId ? updated : i)));
        } catch {
            setError('Не удалось обновить количество');
        }
    };

    const allSelected = items.length > 0 && selectedIds.length === items.length;
    const toggleSelectAll = () =>
        setSelectedIds(allSelected ? [] : items.map(i => i.id));
    const toggleSelectOne = (id: number) =>
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );

    const handleCreateOrder = async () => {
        const cartIds = items.filter(i => selectedIds.includes(i.id)).map(i => i.id);
        if (cartIds.length === 0) return;
        setOrdering(true);
        setError(null);
        try {
            const order = await createOrder(cartIds);
            navigate(`/orders/${order.id}`);
        } catch {
            setError('Не удалось оформить заказ');
        } finally {
            setOrdering(false);
        }
    };

    useEffect(() => {
        loadPage(1);
    }, []);

    if (loading) return (
        <MainLayout>
            <div className="flex items-center justify-center h-64">
                <span className="text-gray-500">Загрузка корзины...</span>
            </div>
        </MainLayout>
    );

    if (error) return (
        <MainLayout>
            <div className="container mx-auto p-6">
                <p className="text-red-500 text-center">{error}</p>
            </div>
        </MainLayout>
    );

    if (!meta || items.length === 0) return (
        <MainLayout>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Ваша корзина</h1>
                <p className="text-gray-600">Корзина пуста.</p>
            </div>
        </MainLayout>
    );

    const total = items
        .filter(item => selectedIds.includes(item.id))
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <MainLayout>
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-semibold">Ваша корзина</h1>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={toggleSelectAll}
                            className="form-checkbox"
                        />
                        <span className="ml-2">Выбрать все</span>
                    </label>
                </div>

                <div className="space-y-4">
                    {items.map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row bg-white shadow rounded-lg overflow-hidden">
                            <div className="p-4 flex items-start">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(item.id)}
                                    onChange={() => toggleSelectOne(item.id)}
                                    className="form-checkbox mt-1 mr-4"
                                />
                                <Link to={`/products/${item.product.id}`} className="block sm:w-1/4">
                                    {item.product.medias[0]?.url
                                        ? <img src={item.product.medias[0].url} alt={item.product.name} className="w-full h-32 object-cover"/>
                                        : <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-400">Нет изображения</span>
                                        </div>}
                                </Link>
                            </div>
                            <div className="p-4 flex-grow flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <Link to={`/products/${item.product.id}`} className="text-xl font-medium text-blue-600 hover:underline">
                                            {item.product.name}
                                        </Link>
                                        <button onClick={() => handleRemove(item.id)} className="text-red-600 hover:underline">
                                            Удалить
                                        </button>
                                    </div>
                                    <p className="text-gray-600 mt-2 line-clamp-2">{item.product.description}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            className="px-2 py-1 border rounded"
                                        >−</button>
                                        <span>{item.quantity} шт.</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className="px-2 py-1 border rounded"
                                        >＋</button>
                                    </div>
                                    <span className="font-bold">
                    {(item.product.price * item.quantity).toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    })}
                  </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-right space-y-4">
                    <div>
            <span className="text-2xl font-semibold">
              Итого:{' '}
                {total.toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                })}
            </span>
                    </div>

                    <button
                        onClick={handleCreateOrder}
                        disabled={ordering || selectedIds.length === 0}
                        className="w-full sm:w-auto bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {ordering ? 'Оформляем...' : 'Оформить заказ'}
                    </button>

                    <Paginator currentPage={currentPage} lastPage={meta.last_page} onPageChange={loadPage}/>
                </div>
            </div>
        </MainLayout>
    );
}
