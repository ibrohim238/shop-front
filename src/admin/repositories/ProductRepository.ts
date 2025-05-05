// src/admin/repositories/ProductRepository.ts
import http from '@/utils/http';
import { IProduct } from '@/models/Product';
import { ISingleResponse, IPagination } from '@/types/Response.ts';
import {FilterParams} from '@/types/Params';
import { IProductDto } from '@/admin/dtos/ProductDto';

export async function fetchProducts(
    page: number,
    per_page: number,
    filter: FilterParams = {}
): Promise<IPagination<IProduct>> {
    const params: FilterParams = { page, per_page, ...filter };
    const { data } = await http.get<IPagination<IProduct>>(
        '/private/admin/products',
        { params }
    );
    return data;
}

export async function fetchProductById(
    id: number
): Promise<ISingleResponse<IProduct>> {
    const { data } = await http.get<ISingleResponse<IProduct>>(
        `/private/admin/products/${id}`
    );
    return data;
}

/** Новое: полный апдейт через PUT */
export async function updateProduct(
    id: number,
    dto: IProductDto
): Promise<ISingleResponse<IProduct>> {
    const { data } = await http.put<ISingleResponse<IProduct>>(
        `/private/admin/products/${id}`,
        dto
    );
    return data;
}

export async function storeProduct(
    dto: IProductDto
): Promise<ISingleResponse<IProduct>> {
    const { data } = await http.post<ISingleResponse<IProduct>>(
        '/private/admin/products',
        dto
    );
    return data;
}

export async function deleteProduct(
    id: number
): Promise<void> {
    await http.delete(`/private/admin/products/${id}`);
}