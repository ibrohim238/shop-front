import { useState, useEffect } from 'react';
import { getCharts } from '@/admin/services/OrderItemReporterService.ts';
import { OrderItemReporter } from '@/models/OrderItemReporter.ts';
import { FilterParams } from '@/types/Params';

export function useCategoryOrderCharts(
  categoryId: number,
  format: string = 'daily',
  groupBy: string = 'category',
) {
  const [charts, setCharts] = useState<OrderItemReporter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCharts(format, groupBy, { model_id: categoryId } as FilterParams)
      .then(data => setCharts(data))
      .catch(err => {
        console.error(err);
        setError('Не удалось загрузить данные графика заказов по категории');
      })
      .finally(() => setLoading(false));
  }, [categoryId, format, groupBy]);

  return { charts, loading, error } as const;
}