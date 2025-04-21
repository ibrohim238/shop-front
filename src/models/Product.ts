import {IMedia, Media} from '@/models/Media.ts';
import {Category, ICategory} from "@/models/Category.ts";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number | null;
    medias: IMedia[];
    categories: ICategory[] | null;
    created_at: string;
    updated_at: string;
}

export class Product {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly quantity: number | null,
        public readonly medias: Media[],
        public readonly categories: Category[] | null,
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) {}

    public static fromData(data: IProduct): Product {
        return new Product(
            data.id,
            data.name,
            data.description,
            data.price,
            data.quantity,
            data.medias.map(Media.fromData),
            data.categories?.map(Category.fromData) || null,
            new Date(data.created_at),
            new Date(data.updated_at)
        );
    }
}
