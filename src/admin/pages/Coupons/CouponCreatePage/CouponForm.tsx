import { useState, ChangeEvent, FormEvent, ReactElement } from 'react';
import { CouponDto } from '@/admin/dtos/CouponDto.ts';
import { storeCoupon } from '@/admin/services/CouponService.ts';
import type { Coupon } from '@/models/Coupon.ts';

interface ICouponForm {
  code: string;
  description: string;
  type: string;
  amount: number;
}

interface Props {
  success: (coupon: Coupon) => void;
}

export default function CouponForm({ success }: Props): ReactElement {
  const [couponForm, setCouponForm] = useState<ICouponForm>({
    code: '',
    description: '',
    type: '',
    amount: 0,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCouponForm(prev => ({
      ...prev,
      [e.target.name]:
        e.target.type === 'number'
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const newCoupon = await storeCoupon(
        new CouponDto(
          couponForm.code,
          couponForm.description,
          couponForm.type,
          couponForm.amount
        )
      );
      success(newCoupon);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Код</label>
        <input
          name="code"
          type="text"
          value={couponForm.code}
          onChange={handleChange}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Описание</label>
        <textarea
          name="description"
          value={couponForm.description}
          onChange={handleChange}
          className="mt-1 block w-full border rounded p-2"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Тип</label>
          <input
            name="type"
            type="text"
            value={couponForm.type}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Сумма</label>
          <input
            name="amount"
            type="number"
            value={couponForm.amount}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          disabled={saving}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Отмена
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {saving ? 'Сохраняю...' : 'Сохранить!'}
        </button>
      </div>
    </form>
  );
}