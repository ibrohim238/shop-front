// src/common/services/MediaService.ts
import { fetchMedia, storeMedia as storeMediaRequest } from '@/common/repositories/MediaRepository';
import { Media, IMedia } from '@/models/Media';
import { ResponsePagination, PaginationMeta } from '@/models/ResponsePagination.ts';
import {castFilterParams, FilterParams} from '@/types/Params';

/**
 * Получить список медиа-файлов пользователя с пагинацией и фильтрацией.
 * @param page — номер страницы, по умолчанию 1
 * @param per_page — элементов на странице, по умолчанию 15
 * @param filter — объект фильтров, ключ — поле, значение — число или строка
 */
export async function getMedia(
    page = 1,
    per_page = 15,
    filter: FilterParams = {}
): Promise<ResponsePagination<Media>> {
    // Преобразуем фильтры в массив строк вида "filter[field]=value"
    const filterParams = castFilterParams(filter);

    // Вызываем репозиторий
    const { data: rawData, meta: rawMeta } = await fetchMedia(
        page,
        per_page,
        filterParams
    );

    // Мапим в модели
    const medias = rawData.map((d: IMedia) => Media.fromData(d));
    const meta = PaginationMeta.fromData(rawMeta);

    return ResponsePagination.fromData({ data: medias, meta });
}

/**
 * Загрузить файлы в медиа-хранилище пользователя.
 * @param files — массив объектов File (input[type="file"].files)
 */
export async function storeMedia(files: File[]): Promise<Media[]> {
    const { data } = await storeMediaRequest(files);

    return data.map((d: IMedia) => Media.fromData(d));
}
