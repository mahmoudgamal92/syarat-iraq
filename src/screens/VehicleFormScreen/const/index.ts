import { MechanismRequest } from '@types';
import * as Yup from 'yup';

export const initialValues: MechanismRequest = {
    mechanismTypeId: "",
    mechanismBrandId: "",
    mechanismModalId: "",
    mechanismEngineTypeId: "",
    mechanismImportCountry: "",
    mechanismYear: "",
    mechanismStatus: 0,        // 1 = كلين, 2 = بدون حادث, 3 = بها حادث
    mechanismLocation: "",
    mechanismNumber: "",
    mechanismOdometer: "",
    mechanismPrice: "",
    phoneNumber: "",
    mechanismImages: "",    // base64 string or URL
};


export const getValidationSchema = (type: string) => {
    return Yup.object().shape({
        mechanismBrandId: Yup.string().required("اختر العلامة التجارية"),
        mechanismModalId: Yup.string().required("اختر الموديل"),
        mechanismEngineTypeId: Yup.string().required("اختر نوع المحرك"),
        mechanismImportCountry: Yup.string().required("اختر بلد الاستيراد"),
        // mechanismYear: Yup.number()
        //     .required("ادخل سنة الصنع")
        //     .min(1900, "سنة غير صالحة")
        //     .max(new Date().getFullYear() + 1, "سنة غير صالحة"),
        mechanismStatus: Yup.number()
            .required("اختر حالة المركبة")
            .min(1, "اختر حالة المركبة"),
        mechanismLocation: Yup.string().required("ادخل مكان التواجد"),
        mechanismNumber: Yup.string().required("ادخل رقم المركبة"),
        // mechanismOdometer: Yup.number()
        //     .required("ادخل عدد الكيلومترات")
        //     .min(0, "عدد الكيلومترات يجب أن يكون أكبر من صفر"),
        // mechanismPrice: Yup.number()
        //     .required("ادخل السعر")
        //     .min(0, "السعر يجب أن يكون أكبر من صفر"),
        // phoneNumber: Yup.string().required("ادخل رقم الهاتف"),
    });
};
