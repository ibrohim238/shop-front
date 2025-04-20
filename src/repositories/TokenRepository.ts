// src/repositories/TokenRepository.ts
import { IPasswordGrant, IRefreshGrant, ITokenResponse } from '@/models/Token';
import http from '@/utils/http';

const clientId = import.meta.env.VITE_CLIENT_ID as string;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET as string;

export async function login(
    username: string,
    password: string
): Promise<ITokenResponse> {
    const payload: IPasswordGrant = {
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
        username,
        password,
    };
    const response = await http.post<ITokenResponse>('/private/oauth/token', payload);
    return response.data;
}

export async function refreshToken(refreshToken: string): Promise<ITokenResponse> {
    const payload: IRefreshGrant = {
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
    };
    const response = await http.post<ITokenResponse>('/private/oauth/token', payload);
    return response.data;
}

export async function logout(): Promise<void> {
    await http.delete<void>('/private/oauth/logout');
}
