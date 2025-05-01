// src/services/CategoryService.ts
import {
    fetchCategories,
    fetchCategoryById
} from '@/admin/repositories/CategoryRepository.ts';
import { Category, ICategory } from '@/models/Category.ts';
import { Pagination, PaginationMeta } from '@/models/Pagination.ts';
import {FilterParams} from "@/types/Params.ts";

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
): Promise<Pagination<Category>> {
    const filterParams = Object.entries(filter).reduce((acc, [key, value]) => {
        acc[`filter[${key}]`] = value;
        return acc;
    }, {} as FilterParams);

    const { data, meta } = await fetchCategories(page, per_page, filterParams);
    const categories = data.map((d: ICategory) => Category.fromData(d));
    const paginationMeta = PaginationMeta.fromData(meta);
    return Pagination.fromData({ data: categories, meta: paginationMeta });
}

/**
 * Получить детали категории по ID.
 */
export async function getCategoryById(id: number): Promise<Category> {
    const { data } = await fetchCategoryById(id);
    return Category.fromData(data);
}
