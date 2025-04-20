// src/models/Cart.ts
import { Product, IProduct } from '@/models/Product';

export interface ICart {
    id: number;
    product: IProduct;
    quantity: number;
    created_at: string;
    updated_at: string;
}

export class Cart {
    constructor(
        public readonly id: number,
        public readonly product: Product,
        public readonly quantity: number,
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) {}

    public static fromData(data: ICart): Cart {
        return new Cart(
            data.id,
            Product.fromData(data.product),
            data.quantity,
            new Date(data.created_at),
            new Date(data.updated_at)
        );
    }
}
