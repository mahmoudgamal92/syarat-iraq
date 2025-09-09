import axiosInstance from './axios';
import { AxiosResponse } from 'axios';
export const request = async (
    {
        method,
        path,
        data = null,
        params = null,
        headers = {}
    })
    : Promise<AxiosResponse> => {
    if (method === 'get') {

        return axiosInstance.get(path, { headers, params });
    }
    return axiosInstance({
        method,
        url: path,
        data,
        headers,
        params,
    });
};

