import { fetchProducts, fetchProductById } from '@/client/repositories/ProductRepository.ts';
import { Product, IProduct } from '@/models/Product.ts';
import {Pagination, PaginationMeta, IPagination, ISingleResponse} from '@/models/Pagination.ts';
import {FilterParams} from "@/types/Params.ts";


export async function getProducts(
    page = 1,
    limit = 15,
    filter: FilterParams = {},
): Promise<Pagination<Product>> {
    const flatFilter: string[] = [];
    for (const [key, value] of Object.entries(filter)) {
        flatFilter.push(`filter[${key}]= ${value}`);
    }

    const { data, meta }: IPagination<IProduct> = await fetchProducts(
        page,
        limit,
        flatFilter,
    );

    return Pagination.fromData({
        data: data.map(Product.fromData),
        meta:  PaginationMeta.fromData(meta),
    });
}

export async function getProductById(id: number): Promise<Product> {
    const raw: ISingleResponse<IProduct> = await fetchProductById(id);

    return Product.fromData(raw.data);
}