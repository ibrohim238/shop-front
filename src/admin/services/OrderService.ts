import {
  fetchOrders as fetchOrdersRequest,
  fetchOrderById as fetchOrderByIdRequest
} from '@/admin/repositories/OrderRepository';
import { Order, IOrder } from '@/models/Order';
import { ResponsePagination, PaginationMeta } from '@/types/Response.ts';
import { castFilterParams, FilterParams } from '@/types/Params';

/**
 * Получить список заказов в админке с пагинацией и фильтрацией.
 */
export async function getOrders(
  page = 1,
  per_page = 15,
  filter: FilterParams = {}
): Promise<ResponsePagination<Order>> {
  const filterParams = castFilterParams(filter);

  const { data: rawData, meta: rawMeta } = await fetchOrdersRequest(
    page,
    per_page,
    filterParams
  );

  return ResponsePagination.fromData({
    data: rawData.map((d: IOrder) => Order.fromData(d)),
    meta: PaginationMeta.fromData(rawMeta),
  });
}

/**
 * Получить один заказ по ID в админке.
 */
export async function getOrderById(id: number): Promise<Order> {
  const { data } = await fetchOrderByIdRequest(id);
  return Order.fromData(data);
}