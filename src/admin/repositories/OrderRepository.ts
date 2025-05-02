import http from '@/utils/http';
import { IOrder } from '@/models/Order';
import { ISingleResponse, IPagination } from '@/models/ResponsePagination.ts';
import { FilterParams } from '@/types/Params';

export async function fetchOrders(
    page: number,
    per_page: number,
    filter: FilterParams = {}
): Promise<IPagination<IOrder>> {
    const params: FilterParams = { page, per_page, ...filter };
    const { data } = await http.get<IPagination<IOrder>>(
        '/private/admin/orders',
        { params }
    );
    return data;
}

export async function fetchOrderById(
    id: number
): Promise<ISingleResponse<IOrder>> {
    const { data } = await http.get<ISingleResponse<IOrder>>(
        `/private/admin/orders/${id}`
    );
    return data;
}