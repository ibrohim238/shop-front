import http from '@/utils/http';
import { ICart } from '@/models/Cart';
import { IPagination, ISingleResponse } from '@/models/Pagination';

export interface FetchCartsParams {
    page: number;
    per_page: number;
    filter: string[];
}

export async function fetchCarts(
    page: number,
    per_page: number,
    filter: string[] = []
): Promise<IPagination<ICart>> {
    const params: FetchCartsParams = { page, per_page, filter };
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
