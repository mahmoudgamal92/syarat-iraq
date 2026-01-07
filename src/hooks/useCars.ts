
import { useState, useCallback, useEffect, use } from 'react';
import { Alert } from 'react-native';
import { carListReq, CarRequest } from '@types';
import { useToast } from '@context';

import {
    brandService,
    carListService,
    carRequestService,
    detailsService,
    engineSizeService,
    gasTypeService,
    getCVTService,
    modelService
} from '@services/cars';
import { useNavigation } from '@react-navigation/native';

export const useCars = () => {
    const { goBack } = useNavigation();
    const { showToast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [engineSizes, setEngineSizes] = useState([]);
    const [cvtTypes, setCVTTypes] = useState([]);
    const [gasTypes, setGasTypes] = useState([]);
    const [carDetails, setCarDetails] = useState([]);
    const [cars, setCars] = useState([]);

    const getBrands = useCallback(
        async () => {
            setLoading(true);
            const res = await brandService({});

            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                alert();
                return;
            }
            setBrands(res?.data?.data || []);
            setLoading(false);
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
            setLoading(false);
        },
        [],
    );



    const getEngineSizes = useCallback(
        async () => {
            setLoading(true);
            const res = await engineSizeService();
            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                return;
            }
            setEngineSizes(res?.data?.data || []);
            setLoading(false);

        },
        [],
    );

    const getCVTTypes = useCallback(
        async () => {
            setLoading(true);
            const res = await getCVTService();
            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                return;
            }
            setCVTTypes(res?.data?.data || []);
            setLoading(false);
        },
        [],
    );


    const getGasTypes = useCallback(
        async () => {
            setLoading(true);
            const res = await gasTypeService();
            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                return;
            }
            setGasTypes(res?.data?.data || []);
            setLoading(false);
        },
        [],
    );


    const getCarDetails = useCallback(
        async () => {
            setLoading(true);
            const res = await detailsService();
            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                return;
            }
            setCarDetails(res?.data?.data || []);
            setLoading(false);
        },
        [],
    );


    const createCarRequest = useCallback(
        async (req: FormData) => {
            setLoading(true);
            const res = await carRequestService(req);
            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                setLoading(false);
                return;
            }
            Alert.alert('تم الارسال', `تم استلام طلبكم وسنتواصل معكم على الواتس اب في أقرب وقت
شكرا لإختياركم تطبيق سيارات واليات العراق`);
            goBack();
            //navigation.navigate('HomeScreen');
            setLoading(false);
        },
        [],
    );

    const getCarList = useCallback(
        async (req: carListReq) => {
            setLoading(true);
            const res = await carListService(req);
            if (res.status !== 200) {
                showToast('حدث خطأ ما، الرجاء المحاولة وقت اخر', 'error')
                setLoading(false);
                return;
            }
            setCars(res.data.data);
            setLoading(false);
        },
        [],
    );


    return {
        loading,
        getBrands,
        getModels,
        getEngineSizes,
        getCVTTypes,
        getGasTypes,
        getCarDetails,
        createCarRequest,
        getCarList,
        cars,
        brands,
        models,
        engineSizes,
        cvtTypes,
        gasTypes,
        carDetails,
    };
};