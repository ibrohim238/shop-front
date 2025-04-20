import http from '@/utils/http';
import { IMedia } from '@/models/Media';
import { IPagination } from '@/models/Pagination';
import { FetchParams } from '@/types/Params';

/**
 * Получить список медиа-файлов пользователя (пагинация + фильтры)
 * @param page — номер страницы, по умолчанию 1
 * @param per_page — элементов на странице, по умолчанию 15
 * @param filter — массив строк вида "filter[field]=value"
 */
export async function fetchMedia(
    page = 1,
    per_page = 15,
    filter: string[] = []
): Promise<IPagination<IMedia>> {
    const params: FetchParams = { page, per_page, filter };
    const response = await http.get<IPagination<IMedia>>(
        '/private/user/media',
        { params }
    );
    return response.data;
}