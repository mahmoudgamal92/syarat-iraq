import { request } from '@network';
import { CarRequest } from '@types';

export const carRequestService = async (body: CarRequest) => {
    const res = request({
        method: 'post',
        path: '/CarRequest',
        data: {
            ...body
        }
    }
    );
    return res;
};