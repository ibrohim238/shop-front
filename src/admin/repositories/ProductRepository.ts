// src/admin/repositories/ProductRepository.ts
import http from '@/utils/http';
import { IProduct } from '@/models/Product';
import { IPagination, ISingleResponse } from '@/models/Pagination';
import { FetchParams } from '@/types/Params';

export interface ICreateProductPayload {
    name: string;
    description: string;
    price: number;
    medias: number[];
    categories: number[];
}

/**
 * Создать новый продукт в админке.
 */
export async function storeProduct(
    payload: ICreateProductPayload
): Promise<ISingleResponse<IProduct>> {
    const response = await http.post<ISingleResponse<IProduct>>(
        '/private/admin/products',
        payload
    );
    return response.data;
}

/**
 * Получить страницу продуктов для админки.
 * @param page — номер страницы (обязательный)
 * @param per_page — элементов на странице (обязательный)
 * @param filter — массив строк вида "filter[field]=value"
 */
export async function fetchProducts(
    page: number,
    per_page: number,
    filter: string[] = []
): Promise<IPagination<IProduct>> {
    const params: FetchParams = { page, per_page, filter };
    const response = await http.get<IPagination<IProduct>>(
        '/private/admin/products',
        { params }
    );
    return response.data;
}

/**
 * Получить детали продукта по ID для админки.
 */
export async function fetchProductById(
    id: number
): Promise<ISingleResponse<IProduct>> {
    const response = await http.get<ISingleResponse<IProduct>>(
        `/private/admin/products/${id}`
    );
    return response.data;
}
