export interface IPaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface IPaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface IPaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface IPagination<T> {
    data: T[];
    meta: IPaginationMeta;
}

export interface ISingleResponse<T> {
    data: T;
}

export class PaginationMeta {
    constructor(
        public readonly current_page: number,
        public readonly from: number,
        public readonly last_page: number,
        public readonly per_page: number,
        public readonly to: number,
        public readonly total: number
    ) {}

    public static fromData(data: IPaginationMeta): PaginationMeta {
        return new PaginationMeta(
            data.current_page,
            data.from,
            data.last_page,
            data.per_page,
            data.to,
            data.total
        );
    }
}


export class Pagination<T> {
    constructor(
        public readonly data: T[],
        public readonly meta: PaginationMeta
    ) {}

    public static fromData<U>(data: Pagination<U>): Pagination<U> {
        return new Pagination(
            data.data,
            PaginationMeta.fromData(data.meta),
        );
    }
}
