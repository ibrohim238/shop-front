import http from '@/utils/http';
import { IUserResponse, User } from '@/models/User';

export async function getUser(): Promise<User> {
    const response = await http.get<IUserResponse>('/private/user');
    return User.fromData(response.data.data);
}
