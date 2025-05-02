import { useState, useEffect } from 'react';
import { fetchCouponById } from '@/admin/repositories/CouponRepository';
import { Coupon } from '@/models/Coupon';

export function useCouponDetail(couponId: number) {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchCouponById(couponId)
      .then(response => {
        setCoupon(Coupon.fromData(response.data));
      })
      .catch(err => {
        console.error(err);
        setError('Ошибка при загрузке купона');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [couponId]);

  return { coupon, loading, error };
}