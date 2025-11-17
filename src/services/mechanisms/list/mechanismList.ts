import { request } from '@network';
import { MechanismRequest } from '@types';

export const mechanismListService = async (body: MechanismRequest) => {
    const res = request({
        method: 'post',
        path: '/MechansimsSearch',
        data: {
            ...body
        }
    }
    );
    return res;
};
