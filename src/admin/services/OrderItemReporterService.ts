import {
  fetchCharts as fetchOrderCharts,
  fetchAvg as fetchOrderAvg,
  fetchSum as fetchOrderSum,
  fetchMax as fetchOrderMax,
  fetchMin as fetchOrderMin,
} from '@/admin/repositories/OrderItemReporterRepository.ts'
import { OrderItemReporter } from '@/models/OrderItemReporter.ts'
import { castFilterParams, FilterParams } from '@/types/Params'

/**
 * Получить данные для графиков заказов в админке
 * с пагинацией, форматом и дополнительными фильтрами.
 */
export async function getCharts(
  format = 'daily',
  type: string = 'product',
  filter: FilterParams = {}
): Promise<OrderItemReporter[]> {
  const params = castFilterParams(filter)
  const { data } = await fetchOrderCharts(format, type, params)
  return data.map(d => OrderItemReporter.fromData(d))
}

/**
 * Получить средние значения по заказам.
 */
export async function getAvg(
  type: string = 'product',
  filter: FilterParams = {}
): Promise<OrderItemReporter> {
  const params = castFilterParams(filter)
  const { data } = await fetchOrderAvg(type, params)
  return OrderItemReporter.fromData(data)
}

/**
 * Получить суммы по заказам.
 */
export async function getSum(
  type: string = 'product',
  filter: FilterParams = {}
): Promise<OrderItemReporter> {
  const params = castFilterParams(filter);
  const { data } = await fetchOrderSum(type, params);
  return OrderItemReporter.fromData(data);
}

/**
 * Получить максимальные значения по заказам.
 */
export async function getMax(
  type: string = 'product',
  filter: FilterParams = {}
): Promise<OrderItemReporter> {
  const params = castFilterParams(filter);
  const { data } = await fetchOrderMax(type, params);
  return OrderItemReporter.fromData(data);
}

/**
 * Получить минимальные значения по заказам.
 */
export async function getMin(
  type: string = 'product',
  filter: FilterParams = {}
): Promise<OrderItemReporter> {
  const params = castFilterParams(filter);
  const { data } = await fetchOrderMin(type, params);
  return OrderItemReporter.fromData(data);
}