import {IOrder, Order} from "@/models/Order.ts";

export interface ICoupon {
    id: number;
    code: string;
    description: string;
    type: number;
    amount: number;
    quantity_allowed: number,
    quantity_used: number,
    min_price: number|null,
    expires_date: string|null,
    orders: IOrder[] | null,
    created_at: string;
    updated_at: string;
}

export class Coupon {
    constructor(
        public readonly id: number,
        public readonly code: string,
        public readonly description: string,
        public readonly type: number,
        public readonly amount: number,
        public readonly quantityAllowed: number,
        public readonly quantityUsed: number,
        public readonly minPrice: number|null,
        public readonly expiresDate: Date|null,
        public readonly orders: Order[] | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}

    public static fromData(data: ICoupon): Coupon {
        return new Coupon(
            data.id,
            data.code,
            data.description,
            data.type,
            data.amount,
            data.quantity_allowed,
            data.quantity_used,
            data.min_price,
            data.expires_date ? new Date(data.expires_date) : null,
            data.orders ? data.orders.map(Order.fromData) : null,
            new Date(data.created_at),
            new Date(data.updated_at)
        );
    }
}