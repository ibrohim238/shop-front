import { fetchProducts, fetchProductById } from '@/repositories/ProductRepository';
import { Product, IProduct } from '@/models/Product';
import {Pagination, PaginationMeta, IPagination, ISingleResponse} from '@/models/Pagination';


export async function getProducts(
    page = 1,
    limit = 15,
    filter: Record<string, number | string> = {}
): Promise<Pagination<Product>> {
    const flatFilter: string[] = [];
    for (const [key, value] of Object.entries(filter)) {
        flatFilter.push(`filter[${key}]= ${value}`);
    }

    const raw: IPagination<IProduct> = await fetchProducts(
        page,
        limit,
        flatFilter,
    );

    const products = raw.data.map(Product.fromData);
    const meta = PaginationMeta.fromData(raw.meta);

    return Pagination.fromData({
        data: products,
        meta: meta,
    });
}

export async function getProductById(id: number): Promise<Product> {
    const raw: ISingleResponse<IProduct> = await fetchProductById(id);

    return Product.fromData(raw.data);
}