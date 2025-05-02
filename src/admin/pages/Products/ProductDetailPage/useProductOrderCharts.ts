import { useState, useEffect } from 'react';
import { getOrderCharts } from '@/admin/services/OrderChartsService';
import { OrderChart } from '@/models/OrderChart';
import { FilterParams } from '@/types/Params';

export function useProductOrderCharts(
  productId: number,
  format = 'daily',
  groupBy: string = 'category',
) {
  const [charts, setCharts] = useState<OrderChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getOrderCharts(format, groupBy, { product_id: productId } as FilterParams)
      .then(data => {
        setCharts(data);
      })
      .catch(err => {
        console.error(err);
        setError('Не удалось загрузить данные графика заказов');
      })
      .finally(() => setLoading(false));
  }, [productId, format, groupBy]);

  return { charts, loading, error } as const;
}