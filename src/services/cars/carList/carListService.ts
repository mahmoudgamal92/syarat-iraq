import { request } from '@network';
import { carListReq } from '@types';

export const carListService = async (body: carListReq) => {
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