import { request } from '@network';
import { CarRequest } from '@types';

export const carListService = async (params: CarRequest) => {
    const res = request({
        method: 'post',
        path: '/CarRequest',
        params: { ...params }
    }
    );
    return res;
};