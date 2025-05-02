import { ReactElement } from 'react';
import type { Coupon } from '@/models/Coupon';

interface Props {
  coupon: Coupon;
}

export default function CardCoupon({ coupon }: Props): ReactElement {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Детали купона</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">ID:</span> {coupon.id}
        </p>
        <p>
          <span className="font-medium">Код:</span> {coupon.code}
        </p>
        <p>
          <span className="font-medium">Описание:</span> {coupon.description}
        </p>
        <p>
          <span className="font-medium">Тип:</span> {coupon.type}
        </p>
        <p>
          <span className="font-medium">Сумма:</span> {coupon.amount}
        </p>
      </div>
    </div>
  );
}