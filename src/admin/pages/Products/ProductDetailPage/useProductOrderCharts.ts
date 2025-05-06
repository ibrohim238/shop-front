import { useState, useEffect } from 'react';
import { getCharts } from '@/admin/services/OrderItemReporterService.ts';
import { OrderItemReporter } from '@/models/OrderItemReporter.ts';
import { FilterParams } from '@/types/Params';

export function useProductOrderCharts(
  productId: number,
  format = 'daily',
  type: string = 'category',
) {
  const [charts, setCharts] = useState<OrderItemReporter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCharts(format, type, { model_id: productId } as FilterParams)
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