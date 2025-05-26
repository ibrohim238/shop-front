export interface FilterParams {
    [key: string]: number | string | null;
}

export function castFilterParams(filter: FilterParams) {
    return Object.entries(filter).reduce((acc, [key, value]) => {
        acc[`filter[${key}]`] = value;
        return acc;
    }, {} as FilterParams);
}