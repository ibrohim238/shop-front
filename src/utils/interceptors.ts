// src/utils/interceptors.ts
import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';

// перед каждым запросом
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.info(`[request] [${config.method?.toUpperCase()}] ${config.url}`, config);
    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error]`, error);
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    console.info(
        `[response] [${response.config.method?.toUpperCase()}] ${response.config.url}`,
        response.data
    );
    return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[response error]`, error);
    return Promise.reject(error);
};

/**
 * Применяет все перехватчики к axios‑экземпляру
 */
export function setupInterceptorsTo(
    axiosInstance: AxiosInstance
): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}
