import { useState, useEffect } from 'react';
import { getCharts } from '@/admin/services/OrderItemReporterService.ts';
import { OrderItemReporter } from '@/models/OrderItemReporter.ts';

export function useProductOrderCharts(
  productId: number,
  format = 'day',
  type: string = 'category',
  datePeriod: string[]
) {
  const [charts, setCharts] = useState<OrderItemReporter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const date = datePeriod.join(',');

  useEffect(() => {
    setLoading(true);

    getCharts(format, type, { model_id: productId, date })
      .then(data => {
        setCharts(data);
      })
      .catch(err => {
        console.error(err);
        setError('Не удалось загрузить данные графика заказов');
      })
      .finally(() => setLoading(false));
  }, [productId, format, type, date]);

  return { charts, loading, error } as const;
}