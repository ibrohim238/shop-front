// src/repositories/OrderRepository.ts
import http from '@/utils/http.ts';
import { IOrder } from '@/models/Order.ts';
import { IPagination, ISingleResponse } from '@/models/Pagination.ts';
import {FilterParams} from "@/types/Params.ts";
import {IPreview} from "@/models/Preview.ts";

export interface ICreateOrderPayload {
    carts: number[];
    coupon_code: string|null;
}

/**
 * Получить страницу заказов текущего пользователя.
 */
export async function fetchOrders(
    page: number,
    per_page: number,
    filter: FilterParams = {}
): Promise<IPagination<IOrder>> {
    const params: FilterParams = { page, per_page, ...filter };
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

export async function orderPreview(
    payload: ICreateOrderPayload
): Promise<ISingleResponse<IPreview>> {
    const response = await http.post<ISingleResponse<IPreview>>(
        '/private/user/orders/preview',
        payload
    );
    return response.data;
}