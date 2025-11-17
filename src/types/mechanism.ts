export interface MechanismRequest {
    mechanismTypeId: string;
    mechanismBrandId: string;
    mechanismModalId: string;
    mechanismEngineTypeId: string;
    mechanismImportCountry: string; // e.g., "امريكى"
    mechanismYear: number | string;
    mechanismStatus: number; // 1 = كلين, 2 = بدون حادث, 3 = بها حادث
    mechanismLocation: string;
    mechanismNumber: string;
    mechanismOdometer: string;
    mechanismPrice: string;
    phoneNumber: string;
    mechanismImages: string; // base64 string or URL
}