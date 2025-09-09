import { request } from '@network';

export const modelService = async (BrandId: string) => {
    const res = request({
        method: 'get',
        path: '/CarModals', // leading slash if your baseURL doesn’t end with "/"
        params: { BrandId }
    }
    );
    return res;
};