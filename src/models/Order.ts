// src/models/Order.ts
import { Product, IProduct } from '@/models/Product.ts';
import { Coupon, ICoupon } from '@/models/Coupon.ts';

export interface IOrderItem {
    product: IProduct;
    quantity: number;
}

export class OrderItem {
    constructor(
        public readonly product: Product,
        public readonly quantity: number
    ) {}

    public static fromData(data: IOrderItem): OrderItem {
        return new OrderItem(
            Product.fromData(data.product),
            data.quantity
        );
    }
}

export interface IOrder {
    id: number;
    amount: number;
    status: string;
    items: IOrderItem[];
    coupon?: ICoupon;
    created_at: string;
    updated_at: string;
}

export class Order {
    constructor(
        public readonly id: number,
        public readonly amount: number,
        public readonly status: string,
        public readonly items: OrderItem[],
        public readonly coupon: Coupon | null,
        public readonly created_at: Date,
        public readonly updated_at: Date
    ) {}

    public static fromData(data: IOrder): Order {
        return new Order(
            data.id,
            data.amount,
            data.status,
            data.items.map(OrderItem.fromData),
            data.coupon ? Coupon.fromData(data.coupon) : null,
            new Date(data.created_at),
            new Date(data.updated_at)
        );
    }
}
