import http from '@/utils/http.ts';
import { IUserResponse } from '@/models/User.ts';
import { RegisterDto } from '@/dtos/RegisterDto.ts';

export async function register(dto: RegisterDto): Promise<IUserResponse> {
    const response = await http.post<IUserResponse>(
        '/private/register',
        dto.toApi()
    );

    return response.data;
}