// src/services/OrderService.ts
import {
    fetchOrders,
    fetchOrderById,
    createOrder as createOrderRepo,
    ICreateOrderPayload
} from '@/client/repositories/OrderRepository.ts';
import { Order, IOrder } from '@/models/Order.ts';
import { Pagination, PaginationMeta } from '@/models/Pagination.ts';
import {castFilterParams, FilterParams} from "@/types/Params.ts";

/**
 * Получить список заказов.
 * @param page — номер страницы
 * @param per_page — элементов на странице
 * @param filter — объект фильтров
 */
export async function getOrders(
    page = 1,
    per_page = 15,
    filter: FilterParams = {}
): Promise<Pagination<Order>> {
    const filterParams = castFilterParams(filter);

    const {data, meta} = await fetchOrders(page, per_page, filterParams);

    return Pagination.fromData({
        data: data.map((d: IOrder) => Order.fromData(d)),
        meta: PaginationMeta.fromData(meta),
    });
}

/**
 * Получить детали одного заказа по ID.
 */
export async function getOrderById(id: number): Promise<Order> {
    const { data } = await fetchOrderById(id);
    return Order.fromData(data);
}

/**
 * Создать новый заказ.
 * @param carts — массив ID элементов корзины
 * @param couponCode — код купона (необязательно)
 */
export async function createOrder(
    carts: number[],
    couponCode?: string
): Promise<Order> {
    const payload: ICreateOrderPayload = { carts, coupon_code: couponCode };
    const { data } = await createOrderRepo(payload);
    return Order.fromData(data);
}
