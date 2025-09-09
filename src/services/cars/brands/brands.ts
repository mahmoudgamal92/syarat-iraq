import { request } from '@network';

export const brandService = async ({ }) => {
    const res = request({
        method: 'get',
        path: '/CarBrands',
    }
    );
    return res;
};