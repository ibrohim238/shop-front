// src/admin/services/ProductService.ts
import { fetchProducts, fetchProductById, storeProduct as storeProductRequest, updateProduct as updateProductRequest } from '@/admin/repositories/ProductRepository';
import { Product, IProduct } from '@/models/Product';
import { Pagination, PaginationMeta } from '@/models/Pagination';
import { FilterParams } from '@/types/Params';
import { ProductDto } from '@/admin/dtos/ProductDto';

/**
 * Получить список продуктов в админке с пагинацией и фильтрацией.
 */
export async function getProducts(
    page = 1,
    per_page = 15,
    filter: FilterParams = {}
): Promise<Pagination<Product>> {
    const filterParams = Object.entries(filter).reduce((acc, [key, value]) => {
        acc[`filter[${key}]`] = value;
        return acc;
    }, {} as FilterParams);

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
 */
export async function getProductById(id: number): Promise<Product> {
    const { data } = await fetchProductById(id);
    return Product.fromData(data);
}

/**
 * Создать новый продукт в админке.
 * @param dto — DTO для создания продукта
 */
export async function storeProduct(dto: ProductDto): Promise<Product> {
    const { data } = await storeProductRequest(dto);
    return Product.fromData(data);
}

/**
 * Обновить продукт в админке.
 * @param id — идентификатор
 * @param dto — DTO с новыми полями
 */
export async function updateProduct(
    id: number,
    dto: ProductDto
): Promise<Product> {
    const { data } = await updateProductRequest(id, dto);
    return Product.fromData(data);
}
