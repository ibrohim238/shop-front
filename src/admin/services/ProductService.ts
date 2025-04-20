// src/admin/services/ProductService.ts
import { fetchProducts, fetchProductById } from '@/admin/repositories/ProductRepository';
import { Product, IProduct } from '@/models/Product';
import { Pagination, PaginationMeta } from '@/models/Pagination';
import { FilterParams } from '@/types/Params';

/**
 * Получить список продуктов в админке с пагинацией и фильтрацией.
 * @param page — номер страницы, по умолчанию 1
 * @param per_page — элементов на странице, по умолчанию 15
 * @param filter — объект фильтров, ключ — поле, значение — число или строка
 */
export async function getProducts(
    page = 1,
    per_page = 15,
    filter: FilterParams = {}
): Promise<Pagination<Product>> {
    // Преобразуем объект фильтров в массив строк
    const filterParams = Object.entries(filter).map(
        ([key, value]) => `filter[${key}]=${value}`
    );

    // Вызываем репозиторий
    const { data: rawData, meta: rawMeta } = await fetchProducts(
        page,
        per_page,
        filterParams
    );

    return Pagination.fromData({
        data: rawData.map((d: IProduct) => Product.fromData(d)),
        meta: PaginationMeta.fromData(rawMeta),
    });
}

/**
 * Получить один продукт по ID в админке.
 * @param id — идентификатор продукта
 */
export async function getAdminProductById(id: number): Promise<Product> {
    const { data } = await fetchProductById(id);
    return Product.fromData(data);
}
