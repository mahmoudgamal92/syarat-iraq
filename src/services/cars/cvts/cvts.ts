import { request } from '@network';

export const getCVTService = async () => {
    const res = request({
        method: 'get',
        path: 'GetCVTTypes',
    }
    );
    return res;
};