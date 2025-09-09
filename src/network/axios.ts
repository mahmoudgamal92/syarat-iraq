import axios from 'axios';
import { AUTHORIZATION_TOKEN, baseURL } from '@constants';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    validateStatus: () => true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = `Bearer ${AUTHORIZATION_TOKEN}`;
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error response:', {
            status: error?.response?.status,
            data: error?.response?.data,
            message: error?.message,
            config: error?.config,
        });

        if (error.response?.status === 401) {
            console.log('Unauthorized: 401');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;