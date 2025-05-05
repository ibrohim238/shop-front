// src/repositories/ProductRepository.ts
import http from '@/utils/http.ts';
import { IProduct } from '@/models/Product.ts';
import { IPagination, ISingleResponse } from '@/types/Response.ts';
import {FilterParams} from "@/types/Params.ts";

export async function fetchProducts(
    page: number,
    per_page: number,
    filter: FilterParams = {}
): Promise<IPagination<IProduct>> {
    const params: FilterParams = {
        page,
        per_page,
        ...filter,
    };

    const response = await http.get<IPagination<IProduct>>(
        '/private/products',
        { params }
    );
    return response.data;
}

export async function fetchProductById(
    id: number
): Promise<ISingleResponse<IProduct>> {
    const response = await http.get<ISingleResponse<IProduct>>(
        `/private/products/${id}`
    );
    return response.data;
}
