// src/common/repositories/MediaRepository.ts
import http from '@/utils/http';
import { IMedia } from '@/models/Media';
import { IPagination, ISingleResponse } from '@/models/ResponsePagination.ts';
import { FilterParams } from '@/types/Params';

export interface IStoreMediaResponse {
    data: IMedia[];
}

/**
 * Получить список медиа-файлов пользователя (пагинация + фильтры)
 * @param page — номер страницы, по умолчанию 1
 * @param per_page — элементов на странице, по умолчанию 15
 * @param filter — массив строк вида "filter[field]=value"
 */
export async function fetchMedia(
    page = 1,
    per_page = 15,
    filter: FilterParams = {}
): Promise<IPagination<IMedia>> {
    const params: FilterParams = { page, per_page, ...filter };
    const response = await http.get<IPagination<IMedia>>(
        '/private/user/media',
        { params }
    );
    return response.data;
}

/**
 * Загрузить один или несколько файлов медиа.
 * @param files — массив объектов File или Blob
 * @returns массив созданных записей IMedia
 */
export async function storeMedia(
    files: File[]
): Promise<ISingleResponse<IMedia[]>> {
    const formData = new FormData();
    files.forEach(file => formData.append('media[]', file));

    const response = await http.post<ISingleResponse<IMedia[]>>(
        '/private/user/media',
        formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
    );

    return response.data;
}
