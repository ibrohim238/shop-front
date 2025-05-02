// src/services/CategoryService.ts
import {
    fetchCategories,
    fetchCategoryById
} from '@/client/repositories/CategoryRepository.ts';
import { Category, ICategory } from '@/models/Category.ts';
import { ResponsePagination, PaginationMeta } from '@/models/ResponsePagination.ts';
import {castFilterParams, FilterParams} from "@/types/Params.ts";

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
export async function getCategoryById(id: number): Promise<Category> {
    const { data } = await fetchCategoryById(id);
    return Category.fromData(data);
}
