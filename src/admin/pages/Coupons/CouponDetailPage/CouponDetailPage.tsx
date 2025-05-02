import { ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router';
import CardCoupon from '@/admin/pages/Coupons/CouponDetailPage/CardCoupon';
import LoadingComponent from '@/components/LoadingComponent.tsx';
import ErrorComponent from '@/components/ErrorComponent.tsx';
import { useCouponDetail } from '@/admin/pages/Coupons/CouponDetailPage/useCouponDetail';

export default function CouponDetailPage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const couponId = Number(id);
  const navigate = useNavigate();
  const { coupon, loading, error } = useCouponDetail(couponId);

  const redirect = () => navigate('/admin/coupons');

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error} onRetry={redirect} />;
  if (!coupon) return <ErrorComponent message="Купон не существует" onRetry={redirect} />;

  return (
    <div className="container mx-auto p-6">
      <button onClick={() => navigate('/admin/coupons')} className="mb-4 text-blue-600 hover:underline">
        ← Назад к списку
      </button>
    <CardCoupon coupon={coupon} />
    </div>
  );
}