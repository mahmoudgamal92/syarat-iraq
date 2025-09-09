import { request } from '@network';
import { MechanismRequest } from '@types';

export const mechanismListService = async (params: MechanismRequest) => {
    const res = request({
        method: 'post',
        path: '/MechansimsSearch',
        params: { ...params }
    }
    );
    return res;
};