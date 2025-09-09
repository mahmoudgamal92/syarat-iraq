import { request } from '@network';

export const gasTypeService = async () => {
    const res = request({
        method: 'get',
        path: '/CarGasTypes',
    }
    );
    return res;
};