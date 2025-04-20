import {IMedia, Media} from '@/models/Media';

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number | null;
    medias: IMedia[];
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
            new Date(data.created_at),
            new Date(data.updated_at)
        );
    }
}
