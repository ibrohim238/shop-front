export interface IPreview {
    amount: number;
    discount: number;
}

export class Preview {
    constructor(
        public amount: number,
        public discount: number,
    ) {
    }

    public static fromData(data: IPreview): Preview {
        return new Preview(
            data.amount,
            data.discount,
        );
    }
}