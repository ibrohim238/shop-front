import http from '@/utils/http.ts';
import {IUser} from '@/models/User.ts';
import { RegisterDto } from '@/client/dtos/RegisterDto.ts';
import {ISingleResponse} from "@/models/ResponsePagination.ts";

export async function register(dto: RegisterDto): Promise<ISingleResponse<IUser>> {
    const response = await http.post<ISingleResponse<IUser>>(
        '/private/register',
        dto.toApi()
    );

    return response.data;
}