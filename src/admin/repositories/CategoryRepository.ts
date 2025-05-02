import http from '@/utils/http';
import { ICategory } from '@/models/Category';
import { IPagination, ISingleResponse } from '@/models/ResponsePagination.ts';
import { FilterParams } from '@/types/Params';

/**
 * Получить список категорий с пагинацией.
 */
export async function fetchCategories(
  page: number,
  per_page: number,
  filter: FilterParams = {}
): Promise<IPagination<ICategory>> {
  const params: FilterParams = { page, per_page, ...filter };
  const response = await http.get<IPagination<ICategory>>(
    '/private/admin/categories',
    { params }
  );
  return response.data;
}

/**
 * Получить детали одной категории по Slug.
 */
export async function fetchCategoryBySlug(
  slug: string
): Promise<ISingleResponse<ICategory>> {
  const response = await http.get<ISingleResponse<ICategory>>(
    `/private/admin/categories/${slug}`
  );
  return response.data;
}

/**
 * Создать новую категорию.
 */
export async function storeCategory(
  category: Partial<ICategory>
): Promise<ISingleResponse<ICategory>> {
  const { data } = await http.post<ISingleResponse<ICategory>>(
    '/private/admin/categories',
    category
  );
  return data;
}

/**
 * Обновить категорию по ID.
 */
export async function updateCategory(
  slug: string,
  category: Partial<ICategory>
): Promise<ISingleResponse<ICategory>> {
  const { data } = await http.put<ISingleResponse<ICategory>>(
    `/private/admin/categories/${slug}`,
    category
  );
  return data;
}

/**
 * Удалить категорию по ID.
 */
export async function deleteCategory(
  slug: string
): Promise<ISingleResponse<ICategory>> {
  const { data } = await http.delete<ISingleResponse<ICategory>>(
    `/private/admin/categories/${slug}`
  );
  return data;
}