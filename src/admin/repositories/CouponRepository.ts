import http from '@/utils/http.ts';
import { ICouponDto } from '@/admin/dtos/CouponDto';
import { ICoupon } from '@/models/Coupon.ts';
import { IPagination, ISingleResponse } from '@/models/ResponsePagination.ts';
import { FilterParams } from '@/types/Params.ts';

/**
 * Получить список купонов с пагинацией.
 */
export async function fetchCoupons(
    page: number,
    per_page: number,
    filter: FilterParams = {}
): Promise<IPagination<ICoupon>> {
    const params: FilterParams = { page, per_page, ...filter };
    const response = await http.get<IPagination<ICoupon>>(
        '/private/admin/coupons',
        { params }
    );
    return response.data;
}

/**
 * Создать новый купон.
 */
export async function storeCoupon(
    dto: ICouponDto
): Promise<ISingleResponse<ICoupon>> {
    const { data } = await http.post<ISingleResponse<ICoupon>>(
        '/private/admin/coupons',
        dto
    );
    return data;
}

/**
 * Получить детали купона по ID.
 */
export async function fetchCouponById(
    id: number
): Promise<ISingleResponse<ICoupon>> {
    const { data } = await http.get<ISingleResponse<ICoupon>>(
        `/private/admin/coupons/${id}`
    );
    return data;
}

/**
 * Удалить купон по ID.
 */
export async function deleteCoupon(
  id: number
): Promise<void> {
  await http.delete(`/private/admin/coupons/${id}`);
}