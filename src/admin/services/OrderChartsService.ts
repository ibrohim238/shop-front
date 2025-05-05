import { fetchOrders as fetchOrderCharts } from '@/admin/repositories/OrderChartsRepository';
import { IOrderChart, OrderChart } from '@/models/OrderChart';
import { castFilterParams, FilterParams } from '@/types/Params';

/**
 * Получить данные для графиков заказов в админке
 * с пагинацией, форматом и дополнительными фильтрами.
 */
export async function getOrderCharts(
  format = 'daily',
  type: string = 'product',
  filter: FilterParams = {}
): Promise<OrderChart[]> {
  const filterParams = castFilterParams(filter);

  const { data } = await fetchOrderCharts(
    format,
      type,
    filterParams,
  );

  return data.map((d: IOrderChart) => OrderChart.fromData(d));
}