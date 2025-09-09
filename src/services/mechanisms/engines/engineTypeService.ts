import { request } from '@network';

export const engineTypeService = async () => {
    const res = request({
        method: 'get',
        path: '/MechanismEngineTypes',
    }
    );
    return res;
};