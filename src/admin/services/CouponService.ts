import { 
  fetchCoupons, 
  storeCoupon as storeCouponRequest,
  fetchCouponById, 
  deleteCoupon as deleteCouponRequest 
} from '@/admin/repositories/CouponRepository';
import { Coupon } from '@/models/Coupon';
import { ResponsePagination, PaginationMeta } from '@/types/Response.ts';
import { castFilterParams, FilterParams } from '@/types/Params';
import { CouponDto } from '@/admin/dtos/CouponDto';

/**
 * Получить список купонов в админке с пагинацией и фильтрацией.
 */
export async function getCoupons(
  page = 1,
  per_page = 15,
  filter: FilterParams = {}
): Promise<ResponsePagination<Coupon>> {
  const filterParams = castFilterParams(filter);

  const { data: rawData, meta: rawMeta } = await fetchCoupons(
    page,
    per_page,
    filterParams
  );
  return ResponsePagination.fromData({
    data: rawData.map((d) => Coupon.fromData(d)),
    meta: PaginationMeta.fromData(rawMeta),
  });
}

/**
 * Получить один купон по ID.
 */
export async function getCouponById(id: number): Promise<Coupon> {
  const { data } = await fetchCouponById(id);
  return Coupon.fromData(data);
}

/**
 * Создать новый купон в админке.
 * @param dto — DTO для создания купона
 */
export async function storeCoupon(dto: CouponDto): Promise<Coupon> {
  const { data } = await storeCouponRequest(dto.toApi());
  return Coupon.fromData(data);
}

/**
 * Удалить купон в админке по ID.
 */
export async function deleteCoupon(id: number): Promise<void> {
  await deleteCouponRequest(id);
}