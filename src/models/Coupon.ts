export interface ICoupon {
    id: number;
    code: string;
    description: string;
    type: string;
    amount: number;
    created_at: string;
    updated_at: string;
}

export class Coupon {
    constructor(
        public readonly id: number,
        public readonly code: string,
        public readonly description: string,
        public readonly type: string,
        public readonly amount: number,
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
            new Date(data.created_at),
            new Date(data.updated_at)
        );
    }
}