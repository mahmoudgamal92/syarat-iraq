import { request } from '@network';

export const mechanismRequestService = async (body: FormData) => {
    const res = request({
        method: 'post',
        path: '/MechanismRequest',
        data: body
    }
    );
    return res;
};