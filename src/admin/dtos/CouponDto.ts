export interface ICouponDto {
    code: string;
    description: string;
    type: number;
    amount: number;
    min_price: number|null,
    quantity_allowed: number|null,
    expires_date: string|null,
}

export class CouponDto {
    constructor(
        public readonly code: string,
        public readonly description: string,
        public readonly type: number,
        public readonly amount: number,
        public readonly minPrice: number|null,
        public readonly quantityAllowed: number|null,
        public readonly expiresDate: Date|null,
    ) {}

    public toApi():ICouponDto {
        return {
            code: this.code,
            description: this.description,
            type: this.type,
            amount: this.amount,
            min_price: this.minPrice,
            quantity_allowed: this.quantityAllowed,
            expires_date: this.expiresDate ? this.expiresDate.toISOString() : null,
        };
    }
}
