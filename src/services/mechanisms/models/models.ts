import { request } from '@network';

export const modelService = async (MechanismBrandId: string) => {
    const res = request({
        method: 'get',
        path: '/MechanismModals',
        params: { MechanismBrandId }
    }
    );
    return res;
};