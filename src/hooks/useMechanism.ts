import { useState, useCallback } from 'react';
import { MechanismRequest } from '@types';
import { useToast } from '@context';
import { useNavigation } from '@react-navigation/native';
import {
    brandService,
    modelService,
    mechanismRequestService,
    mechanismListService,
    typesService,
    engineTypeService,
} from '@services/mechanisms';
import { Alert } from 'react-native';

export const useMechanism = () => {
    const { goBack } = useNavigation();

    const { showToast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [mechanismTypes, setMechanismTypes] = useState([]);
    const [mechanisms, setMechanisms] = useState([]);


    const [engineTypes, setEngineTypes] = useState([]);

    const getBrands = useCallback(
        async (mechanismId: string) => {
            setLoading(true);
            const res = await brandService(mechanismId);
            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                return;
            }
            setBrands(res?.data?.data || []);
        },
        [],
    );

    const getModels = useCallback(
        async (brandId: string) => {
            setLoading(true);
            const res = await modelService(brandId);
            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                return;
            }
            setModels(res?.data?.data || []);
        },
        [],
    );


    const getMechanismTypes = useCallback(
        async () => {
            setLoading(true);
            const res = await typesService();

            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                return;
            }
            setMechanismTypes(res?.data?.data || []);
            setLoading(false);
        },
        [],
    );

    const getMehcanismEngineTypes = useCallback(
        async () => {
            setLoading(true);
            const res = await engineTypeService();

            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                return;
            }
            setEngineTypes(res?.data?.data || []);
        },
        [],
    );



    const createMechanismRequest = useCallback(
        async (req: FormData) => {
            setLoading(true);
            const res = await mechanismRequestService(req);
            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                setLoading(false);
                return;
            }
            setLoading(false);
            Alert.alert('تم الارسال', `تم استلام طلبكم وسنتواصل معكم على الواتس اب في أقرب وقت
شكرا لإختياركم تطبيق سيارات واليات العراق`);
            goBack();

        },
        [],
    );

    const getMechanismList = useCallback(
        async (req: MechanismRequest) => {
            setLoading(true);
            const res = await mechanismListService(req);
            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                setLoading(false);
                return;
            }
            setLoading(false);
            setMechanisms(res.data.data);
            //return res.data.data;
        },
        [],
    );



    return {
        getModels,
        getMechanismTypes,
        getBrands,
        createMechanismRequest,
        getMechanismList,
        getMehcanismEngineTypes,
        mechanisms,
        models,
        brands,
        mechanismTypes,
        engineTypes,
        loading,
    };
};