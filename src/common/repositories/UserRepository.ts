import http from '@/utils/http.ts';
import {IUser} from '@/models/User.ts';
import {ISingleResponse} from "@/models/ResponsePagination.ts";

export async function fetchUser(): Promise<ISingleResponse<IUser>> {
    const response = await http.get<ISingleResponse<IUser>>('/private/user');
    return response.data;
}
