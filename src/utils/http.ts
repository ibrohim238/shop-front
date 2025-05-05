import axios, { AxiosInstance } from 'axios';
import { setupInterceptorsTo } from './interceptors.ts';

const baseURL: string = import.meta.env.VITE_API_URL as string;

const http: AxiosInstance = setupInterceptorsTo(
    axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
);

export default http;
