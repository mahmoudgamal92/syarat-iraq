import { request } from '@network';
import { MechanismRequest } from '@types';

export const mechanismRequestService = async (body: MechanismRequest) => {
    const res = request({
        method: 'post',
        path: '/MechanismRequest',
        data: {
            ...body
        }
    }
    );
    return res;
};