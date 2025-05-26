import { useState, useEffect } from 'react';
import { getCharts } from '@/admin/services/OrderItemReporterService.ts';
import { OrderItemReporter } from '@/models/OrderItemReporter.ts';

export function useProductOrderCharts(
  productId: number,
  format = 'day',
  type: string = 'category',
) {
  const [charts, setCharts] = useState<OrderItemReporter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // вычисляем период в зависимости от формата
    const now = new Date();
    const nowStr = now.toISOString().slice(0, 10);
    const past = new Date(now);
    switch (format) {
      case 'week':
        past.setMonth(past.getMonth() - 3);
        break;
      case 'month':
        past.setMonth(past.getMonth() - 12);
        break;
      case 'year':
        past.setFullYear(past.getFullYear() - 6);
        break;
      default:
        past.setDate(past.getDate() - 30);
    }
    const pastStr = past.toISOString().slice(0, 10);
    const date = `${pastStr},${nowStr}`;

    getCharts(format, type, { model_id: productId, date })
      .then(data => {
        setCharts(data);
      })
      .catch(err => {
        console.error(err);
        setError('Не удалось загрузить данные графика заказов');
      })
      .finally(() => setLoading(false));
  }, [productId, format, type]);

  return { charts, loading, error } as const;
}