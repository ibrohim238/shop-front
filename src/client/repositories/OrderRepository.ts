// src/repositories/OrderRepository.ts
import http from '@/utils/http.ts';
import { IOrder } from '@/models/Order.ts';
import { IPagination, ISingleResponse } from '@/models/Pagination.ts';
import {FetchParams} from "@/types/Params.ts";

export interface ICreateOrderPayload {
    carts: number[];
    coupon_code?: string;
}

/**
 * Получить страницу заказов текущего пользователя.
 */
export async function fetchOrders(
    page: number,
    per_page: number,
    filter: string[] = []
): Promise<IPagination<IOrder>> {
    const params: FetchParams = { page, per_page, filter };
    const response = await http.get<IPagination<IOrder>>(
        '/private/user/orders',
        { params }
    );
    return response.data;
}

/**
 * Получить детали одного заказа по ID.
 */
export async function fetchOrderById(
    id: number
): Promise<ISingleResponse<IOrder>> {
    const response = await http.get<ISingleResponse<IOrder>>(
        `/private/user/orders/${id}`
    );
    return response.data;
}

/**
 * Создать новый заказ.
 */
export async function createOrder(
    payload: ICreateOrderPayload
): Promise<ISingleResponse<IOrder>> {
    const response = await http.post<ISingleResponse<IOrder>>(
        '/private/user/orders',
        payload
    );
    return response.data;
}
