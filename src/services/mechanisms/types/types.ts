import { request } from '@network';

export const typesService = async () => {
    const res = request({
        method: 'get',
        path: '/MechanismEngineTypes',
    }
    );
    return res;
};