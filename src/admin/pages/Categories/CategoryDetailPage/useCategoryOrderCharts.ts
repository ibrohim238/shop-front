import { useState, useEffect } from 'react';
import { getOrderCharts } from '@/admin/services/OrderChartsService';
import { OrderChart } from '@/models/OrderChart';
import { FilterParams } from '@/types/Params';

export function useCategoryOrderCharts(
  categoryId: number,
  format: string = 'daily',
  groupBy: string = 'category',
) {
  const [charts, setCharts] = useState<OrderChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getOrderCharts(format, groupBy, { model_id: categoryId } as FilterParams)
      .then(data => setCharts(data))
      .catch(err => {
        console.error(err);
        setError('Не удалось загрузить данные графика заказов по категории');
      })
      .finally(() => setLoading(false));
  }, [categoryId, format, groupBy]);

  return { charts, loading, error } as const;
}