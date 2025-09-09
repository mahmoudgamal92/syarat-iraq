export type APIMethod = 'post' | 'put' | 'get' | 'delete' | 'patch';

export type APIHeadersReq = {
    'Content-Type'?: string;
    'X-Client-Id'?: string;
    'X-Request-Id'?: string;
    'X-Session-Id'?: string | any;
    'X-Session-Language'?: 'EN' | 'AR';
    'X-Device-Id'?: string;
    'X-Device-Name'?: string;
    'X-Device-Platform'?: 'Android' | 'IOS';
    'X-Security-Token'?: string;
    'X-Token-Capcha'?: string;
    'X-Encryption-Key'?: string;
    'X-App-Version'?: string;
    'Cache-Control'?: string;
    'X-User-Id'?: string;
};

export type APIErrorRes = {
    errorCode: string;
    status: number;
    statusText: string;
};

export type APISuccessRes = {
    status: string;
    message: string;
};

export type APIParams = {
    offset?: number;
    limit?: number;
};
