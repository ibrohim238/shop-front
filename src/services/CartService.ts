import {
    fetchCarts,
    fetchAddToCart,
    fetchRemoveFromCart
} from '@/repositories/CartRepository';
import { Cart, ICart } from '@/models/Cart';
import { Pagination, PaginationMeta } from '@/models/Pagination';

export async function getCarts(
    page = 1,
    per_page = 15,
    filter: Record<string, number | string> = {}
): Promise<Pagination<Cart>> {
    const filterParams = Object.entries(filter).map(
        ([key, value]) => `filter[${key}]=${value}`
    );
    const raw = await fetchCarts(page, per_page, filterParams);
    const carts = raw.data.map((item: ICart) => Cart.fromData(item));
    const meta = PaginationMeta.fromData(raw.meta);
    return new Pagination<Cart>(carts, meta);
}

export async function addToCart(
    productId: number,
    quantity: number
): Promise<Cart> {
    const raw = await fetchAddToCart(productId, quantity);
    return Cart.fromData(raw.data);
}

/**
 * Удалить элемент из корзины по ID
 */
export async function removeFromCart(cartId: number): Promise<void> {
    await fetchRemoveFromCart(cartId);
}