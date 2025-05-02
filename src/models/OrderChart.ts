export interface IOrderChart {
    date: Date;
    quantity: number;
    product_id: number;
}

export class OrderChart {
    constructor(
        public readonly date: Date,
        public readonly quantity: number,
        public readonly product_id: number,
    ) {}

    public static fromData(data: IOrderChart): IOrderChart {
        return new OrderChart(
            new Date(data.date),
            data.quantity,
            data.product_id,
        );
    }
}