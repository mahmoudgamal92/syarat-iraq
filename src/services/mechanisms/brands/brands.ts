import { request } from '@network';

export const brandService = async (MechanismTypeId: string) => {
    const res = request({
        method: 'get',
        path: '/MechanismBrands',
        params: { MechanismTypeId }
    }
    );
    return res;
};