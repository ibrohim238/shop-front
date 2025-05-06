export interface IOrderItemReporter {
    quantity: number;
    total_amount: number;
    date: string|null;
}

export class OrderItemReporter {
    constructor(
        public readonly quantity: number,
        public readonly totalAmount: number,
        public readonly date: Date|null,
    ) {}

    public static fromData(data: IOrderItemReporter): OrderItemReporter {
        return new OrderItemReporter(
            data.quantity,
            data.total_amount,
            data.date ? new Date(data.date) : null,
        );
    }
}