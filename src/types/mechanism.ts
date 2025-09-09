export interface MechanismRequest {
    mechanismTypeId: string;
    mechanismBrandId: string;
    mechanismModalId: string;
    mechanismEngineTypeId: string;
    mechanismImportCountry: string; // e.g., "امريكى"
    mechanismYear: number | string;
    mechanismType: number; // 1 = جديد, 2 = مستعمل
    mechanismStatus: number; // 1 = كلين, 2 = بدون حادث, 3 = بها حادث
    mechanismLocation: string;
    mechanismNumber: string;
    mechanismOdometer: number;
    mechanismPrice: number;
    phoneNumber: string;
    mechanismImages: string; // base64 string or URL
}