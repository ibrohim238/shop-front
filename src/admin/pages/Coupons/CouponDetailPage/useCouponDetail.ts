import { useState, useEffect } from 'react';
import { getCouponById } from '@/admin/services/CouponService.ts';
import { Coupon } from '@/models/Coupon';

export function useCouponDetail(couponId: number) {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCouponById(couponId)
      .then(data => {
        setCoupon(data);
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