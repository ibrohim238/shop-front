import http from '@/utils/http.ts';
import { ICart } from '@/models/Cart.ts';
import { IPagination, ISingleResponse } from '@/models/Pagination.ts';
import {FilterParams} from "@/types/Params.ts";

export async function fetchCarts(
    page: number,
    per_page: number,
    filter: FilterParams = {}
): Promise<IPagination<ICart>> {
    const params: FilterParams = { page, per_page, ...filter };
    const response = await http.get<IPagination<ICart>>(
        '/private/user/carts',
        { params }
    );
    return response.data;
}

export async function fetchAddToCart(
    productId: number,
    quantity: number
): Promise<ISingleResponse<ICart>> {
    const response = await http.post<ISingleResponse<ICart>>(
        '/private/user/carts',
        { product_id: productId, quantity }
    );
    return response.data;
}

/**
 * Удалить элемент из корзины по его ID
 */
export async function fetchRemoveFromCart(
    cartId: number
): Promise<void> {
    await http.delete(`/private/user/carts/${cartId}`);
}

/**
 * Обновить количество в элементе корзины
 */
export async function fetchUpdateCartItem(
    cartId: number,
    quantity: number
): Promise<ISingleResponse<ICart>> {
    const response = await http.patch<ISingleResponse<ICart>>(
        `/private/user/carts/${cartId}`,
        { quantity }
    );
    return response.data;
}
