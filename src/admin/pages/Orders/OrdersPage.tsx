import { useState, useEffect, ReactElement } from 'react';
import { Link } from 'react-router';
import { getOrders } from '@/admin/services/OrderService';
import type { Order as OrderModel } from '@/models/Order';
import PaginatorComponent from '@/components/PaginatorComponent';
import type { PaginationMeta } from '@/models/ResponsePagination.ts';

export default function OrdersPage(): ReactElement {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getOrders(page)
      .then(pagination => {
        setOrders(pagination.data);
        setMeta(pagination.meta);
      })
      .catch(err => {
        console.error(err);
        setError('Не удалось загрузить список заказов');
      })
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500">Загрузка заказов...</span>
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
      <h1 className="text-2xl font-semibold mb-4">Управление заказами</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Сумма</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Статус</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Дата создания</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Действия</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-t">
                <td className="px-4 py-2 text-sm text-gray-800">{o.id}</td>
                <td className="px-4 py-2 text-sm text-gray-800 text-right">
                  {o.total_amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{o.status}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {new Date(o.created_at).toLocaleDateString('ru-RU')}
                </td>
                <td className="px-4 py-2 text-center text-sm">
                  <Link
                    to={`/admin/orders/${o.id}`}
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