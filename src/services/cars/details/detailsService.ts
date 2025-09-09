import { request } from '@network';

export const detailsService = async () => {
    const res = request({
        method: 'get',
        path: '/MoreDetails',
    }
    );
    return res;
};