import { ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router';
import CardCoupon from '@/admin/pages/Coupons/CouponDetailPage/CardCoupon';
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';
import { useCouponDetail } from '@/admin/pages/Coupons/CouponDetailPage/useCouponDetail';
import { deleteCoupon } from '@/admin/services/CouponService';

export default function CouponDetailPage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const couponId = Number(id);
  const navigate = useNavigate();
  const { coupon, loading, error } = useCouponDetail(couponId);

  const redirect = () => navigate('/admin/coupons');

  const handleDelete = async () => {
    if (!window.confirm('Вы действительно хотите удалить этот купон?')) {
      return;
    }
    try {
      await deleteCoupon(couponId);
      navigate('/admin/coupons');
    } catch (err) {
      console.error(err);
      alert('Ошибка при удалении купона');
    }
  };

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error} onRetry={redirect} />;
  if (!coupon) return <ErrorComponent message="Купон не существует" onRetry={redirect} />;

  return (
    <div className="container mx-auto p-6">
      <button onClick={redirect} className="mb-4 text-blue-600 hover:underline">
        ← Назад к списку
      </button>
      <CardCoupon coupon={coupon} />
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}