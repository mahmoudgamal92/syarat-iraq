export interface CarRequest {
    toYear: string;
    fromYear: string;
    requestType: 1 | 2; // بيع = 1, استبدال = 2
    brandId: string;
    modalId: string;
    carEngineSizeId: string;
    cvtTypeId: string;
    gasTypeId: string;
    carImportCountry: string;
    carYear: number | string;
    clinderNumber: number;
    // carType: number; // 1 = جديد, 2 = مستعمل
    carStatus: number; // 1 = كلين, 2 = بدون حادث, 3 = بها حادث
    carNumber: string;
    carLocation: string;
    carOdometer: number | string;
    carPrice: number | string;
    phoneNumber: string;
    moreDetailIds: string; // comma-separated IDs
    carImages: string; // base64 string or URL
    replaceByModalId?: string;
    replaceByBrandId?: string;
}