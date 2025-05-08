export interface ICouponDto {
    code: string;
    description: string;
    type: string;
    amount: number;
}

export class CouponDto {
    constructor(
        public readonly code: string,
        public readonly description: string,
        public readonly type: string,
        public readonly amount: number,
    ) {}

    public toApi():ICouponDto {
        return {
            code: this.code,
            description: this.description,
            type: this.type,
            amount: this.amount,
        };
    }
}
