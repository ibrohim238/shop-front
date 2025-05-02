// src/admin/dtos/ProductDto.ts
export interface IProductDto {
    name: string,
    description: string,
    price: number,
    quantity: number,
    medias: number[],
    categories: number[] | null,
}

// src/admin/dtos/ProductDto.ts
export class ProductDto {
    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly quantity: number,
        public readonly medias: number[],
        public readonly categories: number[] | null,
    ) {}

    public toApi():IProductDto {
        return {
            name: this.name,
            description: this.description,
            price: this.price,
            quantity: this.quantity,
            medias: this.medias,
            categories: this.categories,
        };
    }
}
