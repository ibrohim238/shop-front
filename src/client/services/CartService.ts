import {
    fetchCarts,
    fetchAddToCart,
    fetchRemoveFromCart, fetchUpdateCartItem
} from '@/client/repositories/CartRepository.ts';
import { Cart, ICart } from '@/models/Cart.ts';
import { Pagination, PaginationMeta } from '@/models/Pagination.ts';
import {FilterParams} from "@/types/Params.ts";

export async function getCarts(
    page = 1,
    per_page = 15,
    filter: FilterParams = {}
): Promise<Pagination<Cart>> {
    const filterParams = Object.entries(filter).map(
        ([key, value]) => `filter[${key}]=${value}`
    );
    const { data, meta } = await fetchCarts(page, per_page, filterParams);
    return Pagination.fromData({
        data: data.map((item: ICart) => Cart.fromData(item)),
        meta: PaginationMeta.fromData(meta)
    });
}

export async function addToCart(
    productId: number,
    quantity: number
): Promise<Cart> {
    const raw = await fetchAddToCart(productId, quantity);
    return Cart.fromData(raw.data);
}

/**
 * Обновить количество в элементе корзины (через PATCH)
 */
export async function updateCartItem(
    cartId: number,
    quantity: number
): Promise<Cart> {
    const { data } = await fetchUpdateCartItem(cartId, quantity);
    return Cart.fromData(data);
}

/**
 * Удалить элемент из корзины по ID
 */
export async function removeFromCart(cartId: number): Promise<void> {
    await fetchRemoveFromCart(cartId);
}