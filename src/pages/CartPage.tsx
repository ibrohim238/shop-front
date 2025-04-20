import { useState, useEffect, ReactElement } from 'react';
import { Link } from 'react-router';
import MainLayout from '@/layouts/MainLayout';
import Paginator from '@/components/Paginator';
import { getCarts, removeFromCart } from '@/services/CartService';
import type { Cart } from '@/models/Cart';
import type { PaginationMeta } from '@/models/Pagination';

export default function CartPage(): ReactElement {
    const [items, setItems] = useState<Cart[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const loadPage = (page: number) => {
        setLoading(true);
        setError(null);
        getCarts(page)
            .then(paginated => {
                setItems(paginated.data);
                setMeta(paginated.meta);
                setCurrentPage(page);
            })
            .catch(() => {
                setError('Не удалось загрузить корзину');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleRemove = async (cartId: number): Promise<void> => {
        setLoading(true);
        try {
            await removeFromCart(cartId);
            // после удаления перезагружаем текущую страницу
            loadPage(currentPage);
        } catch {
            setError('Не удалось удалить элемент');
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPage(1);
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-64">
                    <span className="text-gray-500">Загрузка корзины...</span>
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

    if (!meta || items.length === 0) {
        return (
            <MainLayout>
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-semibold mb-6">Ваша корзина</h1>
                    <p className="text-gray-600">Корзина пуста.</p>
                </div>
            </MainLayout>
        );
    }

    const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <MainLayout>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Ваша корзина</h1>
                <div className="space-y-4">
                    {items.map(item => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row bg-white shadow rounded-lg overflow-hidden"
                        >
                            <Link
                                to={`/products/${item.product.id}`}
                                className="block sm:w-1/4"
                            >
                                {item.product.medias[0]?.url ? (
                                    <img
                                        src={item.product.medias[0].url}
                                        alt={item.product.name}
                                        className="w-full h-32 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400">Нет изображения</span>
                                    </div>
                                )}
                            </Link>
                            <div className="p-4 flex-grow flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <Link
                                            to={`/products/${item.product.id}`}
                                            className="text-xl font-medium text-blue-600 hover:underline"
                                        >
                                            {item.product.name}
                                        </Link>
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                    <p className="text-gray-600 mt-2 line-clamp-2">
                                        {item.product.description}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                  <span>
                    <span className="font-semibold">Цена:</span>{' '}
                      {item.product.price.toLocaleString('ru-RU', {
                          style: 'currency',
                          currency: 'RUB',
                      })}
                  </span>
                                    <span>
                    <span className="font-semibold">Кол-во:</span>{' '}
                                        {item.quantity} шт.
                  </span>
                                    <span className="font-bold">
                    {(item.product.price * item.quantity).toLocaleString(
                        'ru-RU',
                        { style: 'currency', currency: 'RUB' }
                    )}
                  </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <div className="text-right mb-4">
            <span className="text-2xl font-semibold">
              Итого:{' '}
                {total.toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                })}
            </span>
                    </div>
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
