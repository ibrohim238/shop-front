import { fetchProducts, fetchProductById } from '@/client/repositories/ProductRepository.ts';
import { Product, IProduct } from '@/models/Product.ts';
import {ResponsePagination, PaginationMeta, IPagination, ISingleResponse} from '@/types/Response.ts';
import {castFilterParams, FilterParams} from "@/types/Params.ts";


export async function getProducts(
    page = 1,
    limit = 15,
    filter: FilterParams = {},
): Promise<ResponsePagination<Product>> {
    const filterParams = castFilterParams(filter);

    const { data, meta }: IPagination<IProduct> = await fetchProducts(
        page,
        limit,
        filterParams,
    );

    return ResponsePagination.fromData({
        data: data.map(Product.fromData),
        meta:  PaginationMeta.fromData(meta),
    });
}

export async function getProductById(id: number): Promise<Product> {
    const raw: ISingleResponse<IProduct> = await fetchProductById(id);

    return Product.fromData(raw.data);
}