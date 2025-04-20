export interface FilterParams {
    [key: string]: number | string;
}


export interface FetchParams {
    /** Номер страницы */
    page: number;
    /** Элементов на странице */
    per_page: number;
    /** Массив строк вида "filter[field]=value" */
    filter: string[];
}