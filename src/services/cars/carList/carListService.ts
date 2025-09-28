import { request } from '@network';
import { CarRequest } from '@types';

export const carListService = async (body: CarRequest) => {
    const res = request({
        method: 'post',
        path: '/SearchCars',
        data: {
            ...body
        }
    }
    );
    return res;
};