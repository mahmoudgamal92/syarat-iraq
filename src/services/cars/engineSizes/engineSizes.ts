import { request } from '@network';

export const engineSizeService = async () => {
    const res = request({
        method: 'get',
        path: '/CarEngineSizes',
    }
    );
    return res;
};