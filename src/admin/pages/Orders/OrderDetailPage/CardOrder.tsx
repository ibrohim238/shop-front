import { ReactElement } from 'react';
import type { Order } from '@/models/Order';

interface Props {
  order: Order;
}

export default function CardOrder({ order }: Props): ReactElement {
  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold">Заказ #{order.id}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><span className="font-medium">Сумма:</span>{' '}
            {order.total_amount.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB'
            })}
          </p>
          <p><span className="font-medium">Статус:</span> {order.status}</p>
          <p>
            <span className="font-medium">Создан:</span>{' '}
            {order.created_at.toLocaleString('ru-RU')}
          </p>
          <p>
            <span className="font-medium">Обновлён:</span>{' '}
            {order.updated_at.toLocaleString('ru-RU')}
          </p>
          <p>
            <span className="font-medium">Купон:</span>{' '}
            {order.coupon ? order.coupon.code : '—'}
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-2">Товары в заказе:</h3>
          <ul className="list-disc list-inside space-y-1">
            {order.items.map(item => (
              <li key={item.product.id}>
                {item.product.name} × {item.quantity}{' '}
                ({item.total_amount.toLocaleString('ru-RU', {
                  style: 'currency',
                  currency: 'RUB'
                })})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}