import * as Yup from 'yup';

import { CarRequest } from '@types';


export const getValidationSchema = (type: string) => {
    return Yup.object().shape({
        brandId: Yup.string().required("اختر العلامة التجارية"),
        modalId: Yup.string().required("اختر الفئة"),
        carEngineSizeId: Yup.string().required("اختر حجم المحرك"),
        cvtTypeId: Yup.string().required("اختر نوع الكير"),
        carImportCountry: Yup.string().required("اختر البلد الوارد منها السيارة"),
        gasTypeId: Yup.string().required("اختر نوع الوقود"),
        carStatus: Yup.number().required("اختر حالة السيارة").min(1, "اختر حالة السيارة"),
        carType: Yup.number().required("اختر نوع السيارة").min(1, "اختر نوع السيارة"),
        carNumber: Yup.string().required("ادخل رقم اللوحة"),
        carLocation: Yup.string().required("ادخل مكان التواجد"),
        carYear: type !== "buy" ? Yup.number().required("ادخل سنة الصنع") : Yup.number().nullable(),
        clinderNumber: Yup.number().required("ادخل عدد السلندرات"),
        carOdometer: Yup.number().required("ادخل عدد الكيلومترات").min(0, "عدد الكيلومترات يجب أن يكون أكبر من صفر"),
        carPrice: type !== "exchange" ? Yup.number().required("ادخل السعر").min(0, "السعر يجب أن يكون أكبر من صفر") : Yup.number().nullable(),
        phoneNumber: type !== "buy" ? Yup.string().required("ادخل رقم الهاتف") : Yup.string().nullable(),
        replaceByBrandId: type === "exchange" ? Yup.string().required("ادخل السيارة المراد المبادلة بها") : Yup.string().nullable(),
        replaceByModalId: type === "exchange" ? Yup.string().required("ادخل السيارة المراد المبادلة بها") : Yup.string().nullable(),
        carImages: Yup.array().min(1, "اختر صورة واحدة على الأقل"),
    });
};


export const initialValues: CarRequest = {
    carStatus: 0,            // number
    // carType: 0,              // number
    brandId: "",             // string (ID)
    modalId: "",             // string (ID)
    carEngineSizeId: "",     // string (ID)
    cvtTypeId: "",           // string (ID)
    carImportCountry: "",    // string
    clinderNumber: 0,        // number
    gasTypeId: "",           // string (ID)
    carNumber: "",           // string
    carLocation: "",         // string
    fromYear: "",            // string (for conditional buy)
    toYear: "",              // string (for conditional buy)
    carYear: "",             // string (manufacturing year)
    carOdometer: "",         // string / number
    carPrice: "",            // string / number
    phoneNumber: "",         // string
    replaceByBrandId: "",    // string
    replaceByModalId: "",    // string
    moreDetailIds: "",       // string
    carImages: "",           // array
    requestType: 1,          // number (1-buy, 2-sell)
};