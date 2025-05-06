import http from '@/utils/http';
import { FilterParams } from '@/types/Params';
import {IOrderItemReporter} from "@/models/OrderItemReporter.ts";
import {IResponse, ISingleResponse} from "@/types/Response.ts";


export async function fetchCharts(
    format: string,
    type: string = 'product',
    filter: FilterParams = {}
): Promise<IResponse<IOrderItemReporter>> {
    const params: FilterParams = { type, format, ...filter };
    const { data } = await http.get<IResponse<IOrderItemReporter>>(
        '/private/admin/order-item-reporters/charts',
        { params }
    );
    return data;
}

export async function fetchAvg(
    type: string = 'product',
    filter: FilterParams = {}
): Promise<ISingleResponse<IOrderItemReporter>> {
    const params: FilterParams = { type, ...filter };
    const { data } = await http.get<ISingleResponse<IOrderItemReporter>>(
        '/private/admin/order-item-reporters/avg',
        { params }
    );
    return data;
}

export async function fetchSum(
    type: string = 'product',
    filter: FilterParams = {}
): Promise<ISingleResponse<IOrderItemReporter>> {
    const params: FilterParams = {  type, ...filter };
    const { data } = await http.get<ISingleResponse<IOrderItemReporter>>(
        '/private/admin/order-item-reporters/sum',
        { params }
    );
    return data;
}

export async function fetchMax(
    type: string = 'product',
    filter: FilterParams = {}
): Promise<ISingleResponse<IOrderItemReporter>> {
    const params: FilterParams = { type, ...filter };
    const { data } = await http.get<ISingleResponse<IOrderItemReporter>>(
        '/private/admin/order-item-reporters/max',
        { params }
    );
    return data;
}

export async function fetchMin(
    type: string = 'product',
    filter: FilterParams = {}
): Promise<ISingleResponse<IOrderItemReporter>> {
    const params: FilterParams = {  type, ...filter };
    const { data } = await http.get<ISingleResponse<IOrderItemReporter>>(
        '/private/admin/order-item-reporters/min',
        { params }
    );
    return data;
}