import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BottomSheet, BottomSheetRef, Dropdown, Loader, Tabber } from '@components';
import { useFormik } from 'formik';

import { useCars } from '@hooks';
import { styles } from './styles';
import { initialValues } from '@screens/CarFormScreen/const';
import { CarRequest, carFilters } from '@types';
import { countries, clinders, carStatus, cities } from '@constants';

export type FiltersSheetRef = {
    open: () => void;
    close: () => void;
};

type FiltersSheetProps = {
    onApply?: (cars: any) => void;
};

export const FiltersSheet = forwardRef<
    FiltersSheetRef,
    FiltersSheetProps
>(({ onApply }, ref) => {
    const filtersSheetRef = useRef<BottomSheetRef>(null);
    const [selectedFilter, setSelectedFilter] = useState<number | string>('');
    useImperativeHandle(ref, () => ({
        open: () => filtersSheetRef.current?.open(),
        close: () => filtersSheetRef.current?.close(),
    }));

    const {
        loading,
        brands,
        models,
        cvtTypes,
        engineSizes,
        gasTypes,
        cars,
        getBrands,
        getModels,
        getCVTTypes,
        getEngineSizes,
        getGasTypes,
        getCarDetails,
        getCarList,
    } = useCars();

    useEffect(() => {
        getBrands();
        getEngineSizes();
        getCVTTypes();
        getGasTypes();
        getCarDetails();
    }, []);

    /* ------------------------ */
    /* 🔹 Apply filters logic   */
    /* ------------------------ */
    const applyFilters = async (values: CarRequest) => {
        const cleanedFilters = Object.fromEntries(
            Object.entries(values || {}).filter(
                ([, value]) =>
                    value !== null &&
                    value !== 0 &&
                    value !== 'xx,xx' &&
                    value !== undefined &&
                    value !== '' &&
                    !(Array.isArray(value) && value.length === 0)
            )
        );

        getCarList({
            PageNumber: 1,
            PageSize: 100,
            PurchaseType: 3,
            ...cleanedFilters,
        });


        onApply?.(cars?.carRequests);
    };

    const formik = useFormik<CarRequest>({
        initialValues,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: applyFilters,
    });

    /* ------------------------ */
    /* 🔹 Change + search       */
    /* ------------------------ */
    const handleChangeAndSearch = (
        field: keyof CarRequest,
        value: any,
        extraAction?: () => void
    ) => {
        const nextValues = {
            ...formik.values,
            [field]: value,
        };

        formik.setValues(nextValues, false);
        extraAction?.();
        applyFilters(nextValues);
    };

    return (
        <BottomSheet
            scroll
            ref={filtersSheetRef}
            title="تصفية نتائج البحث"
        >
            <View style={styles.formContainer}>
                <Tabber
                    data={carFilters}
                    selected={selectedFilter}
                    onSelect={setSelectedFilter}
                />

                <View style={styles.row}>

                    <Dropdown
                        data={models}
                        labelField="name"
                        valueField="id"
                        placeholder="الموديل"
                        value={formik.values.modalId}
                        onChange={item =>
                            handleChangeAndSearch('modalId', item.id)
                        }
                    />
                    <Dropdown
                        data={brands}
                        labelField="name"
                        valueField="id"
                        placeholder="العلامه التجاريه"
                        value={formik.values.brandId}
                        onChange={item =>
                            handleChangeAndSearch(
                                'brandId',
                                item.id,
                                () => getModels(item.id)
                            )
                        }
                    />

                </View>

                <View style={styles.row}>
                    <Dropdown
                        data={engineSizes}
                        labelField="sizeName"
                        valueField="id"
                        placeholder="حجم المحرك"
                        value={formik.values.carEngineSizeId}
                        onChange={item =>
                            handleChangeAndSearch(
                                'carEngineSizeId',
                                item.id
                            )
                        }
                    />

                    <Dropdown
                        data={cvtTypes}
                        labelField="name"
                        valueField="id"
                        placeholder="نوع الكير"
                        value={formik.values.cvtTypeId}
                        onChange={item =>
                            handleChangeAndSearch('cvtTypeId', item.id)
                        }
                    />
                </View>

                <View style={styles.row}>
                    <Dropdown
                        data={countries}
                        labelField="label"
                        valueField="value"
                        placeholder="الوارد ( بلد المنشأ )"
                        value={formik.values.carImportCountry}
                        onChange={item =>
                            handleChangeAndSearch(
                                'carImportCountry',
                                item.value
                            )
                        }
                    />

                    <Dropdown
                        data={gasTypes}
                        labelField="type"
                        valueField="id"
                        placeholder="نوع الوقود"
                        value={formik.values.gasTypeId}
                        onChange={item =>
                            handleChangeAndSearch('gasTypeId', item.id)
                        }
                    />
                </View>

                <View style={styles.row}>
                    <Dropdown
                        dropdownPosition="top"
                        data={carStatus}
                        labelField="label"
                        valueField="value"
                        placeholder="حالة السيارة"
                        value={formik.values.carStatus}
                        onChange={item =>
                            handleChangeAndSearch(
                                'carStatus',
                                item.value
                            )
                        }
                    />

                    <Dropdown
                        dropdownPosition="top"
                        data={clinders}
                        labelField="label"
                        valueField="value"
                        placeholder="عدد السلندرات"
                        value={formik.values.clinderNumber}
                        onChange={item =>
                            handleChangeAndSearch(
                                'clinderNumber',
                                item.value
                            )
                        }
                    />
                </View>

                <View style={styles.row}>
                    <Dropdown
                        dropdownPosition="top"
                        data={cities}
                        labelField="label"
                        valueField="value"
                        placeholder="رقم اللوحة"
                        value={formik.values.carNumber}
                        onChange={item =>
                            handleChangeAndSearch(
                                'carNumber',
                                item.value
                            )
                        }
                    />

                    <Dropdown
                        dropdownPosition="top"
                        data={cities}
                        labelField="label"
                        valueField="value"
                        placeholder="مكان التواجد"
                        value={formik.values.carLocation}
                        onChange={item =>
                            handleChangeAndSearch(
                                'carLocation',
                                item.value
                            )
                        }
                    />
                </View>
            </View>

            {/* optional manual search */}
            <View>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => applyFilters(formik.values)}
                >
                    {loading ? <ActivityIndicator color="#FFF" /> :
                        <Text style={styles.ButtonText}>بحث {cars?.totalCount || 0} سياره</Text>
                    }
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
});
