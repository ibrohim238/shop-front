export interface IOrderChart {
    date: string;
    quantity: number;
    product_id: number;
}

export class OrderChart {
    constructor(
        public readonly date: Date,
        public readonly quantity: number,
        public readonly product_id: number,
    ) {}

    public static fromData(data: IOrderChart): OrderChart {
        return new OrderChart(
            new Date(data.date),
            data.quantity,
            data.product_id,
        );
    }
}