// src/repositories/CategoryRepository.ts
import http from '@/utils/http.ts';
import { ICategory } from '@/models/Category.ts';
import { IPagination, ISingleResponse } from '@/models/Pagination.ts';
import { FilterParams } from "@/types/Params.ts";

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
        '/private/categories',
        { params }
    );
    return response.data;
}

/**
 * Получить детали одной категории по ID.
 */
export async function fetchCategoryById(
    id: number
): Promise<ISingleResponse<ICategory>> {
    const response = await http.get<ISingleResponse<ICategory>>(
        `/private/categories/${id}`
    );
    return response.data;
}
