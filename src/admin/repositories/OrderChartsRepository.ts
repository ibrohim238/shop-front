import http from '@/utils/http';
import { FilterParams } from '@/types/Params';
import {IOrderChart} from "@/models/OrderChart.ts";
import {IResponse} from "@/models/ResponsePagination.ts";


export async function fetchOrders(
    format: string,
    groupBy: string = 'product',
    filter: FilterParams = {}
): Promise<IResponse<IOrderChart>> {
    const params: FilterParams = { format, group_by: groupBy, ...filter };
    const { data } = await http.get<IResponse<IOrderChart>>(
        '/private/admin/orders/charts',
        { params }
    );
    return data;
}