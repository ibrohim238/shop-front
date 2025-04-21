// src/services/AuthService.ts
import { login as loginRequest, refreshToken as refreshRequest, logout as logoutRequest } from '@/common/repositories/TokenRepository.ts';
import { register as registerRequest } from '@/common/repositories/RegisterRepository.ts';
import {RegisterDto} from "@/client/dtos/RegisterDto.ts";
import {User} from "@/models/User.ts";

export async function authenticate(username: string, password: string): Promise<void> {
    const { access_token, refresh_token } = await loginRequest(username, password);
    localStorage.setItem('token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
}

export async function refreshAuthToken(): Promise<void> {
    const currentRefresh = localStorage.getItem('refresh_token');
    if (!currentRefresh) {
        throw new Error('Refresh token is missing');
    }
    const { access_token, refresh_token } = await refreshRequest(currentRefresh);
    localStorage.setItem('token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
}

export async function logout(): Promise<void> {
    await logoutRequest();
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
}

export function isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('token'));
}

export async function register(dto: RegisterDto): Promise<User> {
    const { data } = await registerRequest(dto);

    return User.fromData(data);
}
