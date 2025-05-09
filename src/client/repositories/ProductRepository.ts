// src/repositories/ProductRepository.ts
import http from '@/utils/http.ts';
import { IProduct } from '@/models/Product.ts';
import { IPagination, ISingleResponse } from '@/models/Pagination.ts';
import {FetchParams} from "@/types/Params.ts";

export async function fetchProducts(
    page: number,
    per_page: number,
    filter: string[] = []
): Promise<IPagination<IProduct>> {
    const params: FetchParams = {
        page,
        per_page,
        filter,
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
