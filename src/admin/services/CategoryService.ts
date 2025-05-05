// src/services/CategoryService.ts
import {
    fetchCategories,
    fetchCategoryBySlug,
    storeCategory as storeCategoryRequest,
    updateCategory as updateCategoryRequest,
    deleteCategory as deleteCategoryRequest,
} from '@/admin/repositories/CategoryRepository.ts';
import { Category } from '@/models/Category';
import { ResponsePagination, PaginationMeta } from '@/types/Response.ts';
import {castFilterParams, FilterParams} from "@/types/Params.ts";
import type { ICategory } from '@/models/Category';

/**
 * Получить страницу категорий.
 * @param page — номер страницы, по умолчанию 1
 * @param per_page — количество на странице, по умолчанию 15
 * @param filter
 */
export async function getCategories(
    page = 1,
    per_page = 15,
    filter: FilterParams = {},
): Promise<ResponsePagination<Category>> {
    const filterParams = castFilterParams(filter);

    const { data, meta } = await fetchCategories(page, per_page, filterParams);
    const categories = data.map((d: ICategory) => Category.fromData(d));
    const paginationMeta = PaginationMeta.fromData(meta);
    return ResponsePagination.fromData({ data: categories, meta: paginationMeta });
}

/**
 * Получить детали категории по ID.
 */
export async function getCategoryBySlug(slug: string): Promise<Category> {
    const { data } = await fetchCategoryBySlug(slug);
    return Category.fromData(data);
}

/**
 * Создать новую категорию.
 */
export async function storeCategory(categoryData: Partial<ICategory>): Promise<Category> {
  const { data } = await storeCategoryRequest(categoryData);
  return Category.fromData(data);
}

/**
 * Обновить категорию по Slug.
 */
export async function updateCategory(slug: string, categoryData: Partial<ICategory>): Promise<Category> {
  const { data } = await updateCategoryRequest(slug, categoryData);
  return Category.fromData(data);
}

/**
 * Удалить категорию по Slug.
 */
export async function deleteCategory(slug: string): Promise<void> {
  await deleteCategoryRequest(slug);
}