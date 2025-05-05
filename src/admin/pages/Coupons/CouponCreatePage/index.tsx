import { useNavigate } from 'react-router';
import FormCoupon from '@/admin/pages/Coupons/CouponCreatePage/CouponForm';
import type { Coupon } from '@/models/Coupon.ts';

export default function Index() {
  const navigate = useNavigate();

  const handleSuccess = (newCoupon: Coupon) => {
    navigate(`/admin/coupons/${newCoupon.id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate('/admin/coupons')}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Назад к списку
      </button>
      <FormCoupon success={handleSuccess} />
    </div>
  );
}