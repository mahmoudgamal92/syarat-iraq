import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';

import { useMechanism } from '@hooks';
import { MechanismRequest } from '@types';

import { countries, cities, vechileStatus } from '@constants';
import { BaseLayout, Dropdown, Header, ValidationError } from '@components';

import { getValidationSchema, initialValues } from './const';
import { styles } from './styles';

export const VehicleFormScreen = ({ route }) => {
    const { mechanism, type } = route?.params ?? {};
    const { loading, createMechanismRequest, getMechanismList } = useMechanism();
    const {
        brands,
        models,
        engineTypes,
        getBrands,
        getModels,
        getMehcanismEngineTypes
    } = useMechanism();

    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        getBrands(mechanism.id);
        getMehcanismEngineTypes();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            base64: true,
            quality: 0.7,
        });

        if (!result.canceled && result.assets) {
            const selected = result.assets.map(asset => ({
                uri: asset.uri,
                base64: asset.base64,
            }));
            setImages(selected);
            formik.setFieldValue("carImages", selected);
        }
    };

    const formik = useFormik<MechanismRequest>({
        initialValues,
        validationSchema: getValidationSchema(type),
        onSubmit: async (values) => {
            console.log('Form Values:', values);
            const formData: MechanismRequest = {
                mechanismTypeId: values.mechanismTypeId,
                mechanismBrandId: values.mechanismBrandId,
                mechanismModalId: values.mechanismModalId,
                mechanismEngineTypeId: values.mechanismEngineTypeId,
                mechanismImportCountry: values.mechanismImportCountry,
                mechanismYear: values.mechanismYear,
                mechanismType: values.mechanismType,
                mechanismStatus: values.mechanismStatus,
                mechanismLocation: values.mechanismLocation,
                mechanismNumber: values.mechanismNumber,
                mechanismOdometer: values.mechanismOdometer,
                mechanismPrice: values.mechanismPrice,
                phoneNumber: values.phoneNumber,
                mechanismImages: values.mechanismImages,
            };
            if (type === 'buy') {
                const cars = await getMechanismList(formData);

                // cars.length === 0 ? alert('لا يوجد سيارات متوفره حاليا') :
                //     alert(`يوجد ${cars.length} سيارات متوفره حاليا`);
            }
            createMechanismRequest(formData);
            console.log(formData);
        },
    });

    return (
        <BaseLayout>
            <View style={styles.container}>
                <Header />
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
                    <Text style={styles.instructions}>
                        {type === 'buy' ?
                            'اشتري آليه بكل سهوله'
                            :
                            'اعرض آليتك للبيع'
                        }
                    </Text>


                    <Text style={styles.instructions}>
                        {type === 'buy' ?
                            'حدد التفاصيل في الأسفل ودوس على زر البحث' :
                            ' أكمل التفاصيل في الأسفل و ارسل الطلب'
                        }
                    </Text>




                    {/* Brand & Model */}
                    <ValidationError<MechanismRequest> formik={formik} fields={['mechanismBrandId', 'mechanismModalId']} />
                    <View style={styles.row}>
                        <Dropdown
                            data={brands}
                            labelField="name"
                            valueField="id"
                            placeholder="العلامه التجاريه"
                            value={formik.values.mechanismBrandId}
                            onChange={item => {
                                formik.setFieldValue("mechanismBrandId", item.id);
                                getModels(item.id);
                            }}
                        />
                        <Dropdown
                            data={models}
                            labelField="name"
                            valueField="id"
                            placeholder="نوع الآليه"
                            value={formik.values.mechanismModalId}
                            onChange={item => formik.setFieldValue("mechanismModalId", item.id)}
                        />

                    </View>


                    {/* Engine & CVT */}
                    <ValidationError<MechanismRequest> formik={formik} fields={['mechanismEngineTypeId', 'mechanismImportCountry']} />
                    <View style={styles.row}>
                        <Dropdown
                            data={engineTypes}
                            labelField="type"
                            valueField="id"
                            placeholder="حجم المحرك"
                            value={formik.values.mechanismEngineTypeId}
                            onChange={item => formik.setFieldValue("mechanismEngineTypeId", item.id)}

                        />

                        <Dropdown
                            data={countries}
                            labelField="label"
                            valueField="value"
                            placeholder="الوارد"
                            value={formik.values.mechanismImportCountry}
                            onChange={item => formik.setFieldValue("mechanismImportCountry", item.value)}
                        />


                    </View>



                    {/* Car Status & Cylinders */}
                    <ValidationError<MechanismRequest> formik={formik} fields={['mechanismStatus']} />
                    <View style={styles.row}>
                        <Dropdown
                            data={vechileStatus}
                            labelField="label"
                            valueField="value"
                            placeholder="حاله الاليه"
                            value={formik.values.mechanismStatus}
                            onChange={item => formik.setFieldValue("mechanismStatus", item.value)}
                        />
                    </View>

                    {/* Board Number & Location */}
                    <ValidationError<MechanismRequest> formik={formik} fields={['mechanismNumber', 'mechanismLocation']} />
                    <View style={styles.row}>
                        <Dropdown
                            data={cities}
                            labelField="label"
                            valueField="value"
                            placeholder="رقم اللوحه"
                            value={formik.values.mechanismNumber}
                            onChange={item => formik.setFieldValue("mechanismNumber", item.value)}
                        />
                        <Dropdown
                            data={cities}
                            labelField="label"
                            valueField="value"
                            placeholder="مكان التواجد"
                            value={formik.values.mechanismLocation}
                            onChange={item => formik.setFieldValue("mechanismLocation", item.value)}
                        />

                    </View>


                    <ValidationError<MechanismRequest> formik={formik} fields={['mechanismYear']} />
                    <View style={styles.row}>
                        <TextInput
                            style={styles.input}
                            placeholder="سنه الصنع"
                            value={formik.values.mechanismYear?.toString()}
                            onChangeText={formik.handleChange("mechanismYear")}
                            keyboardType="numeric"
                            placeholderTextColor={'#999'}
                        />
                    </View>


                    <ValidationError<MechanismRequest> formik={formik} fields={['phoneNumber']} />
                    <View style={styles.row}>
                        <TextInput
                            style={styles.input}
                            placeholder="رقم الهاتف"
                            value={formik.values.phoneNumber}
                            onChangeText={formik.handleChange("phoneNumber")}
                            keyboardType="numeric"
                            placeholderTextColor={'#999'}
                        />
                    </View>


                    {/* Kilometers & Price */}

                    <ValidationError<MechanismRequest> formik={formik} fields={['mechanismOdometer', 'mechanismPrice']} />
                    <View style={styles.row}>
                        <TextInput
                            style={styles.input}
                            placeholder="شكد ماشيه الاليه"
                            value={formik.values.mechanismOdometer?.toString()}
                            onChangeText={formik.handleChange("mechanismOdometer")}
                            keyboardType="numeric"
                            placeholderTextColor={'#999'}
                        />
                        {type !== 'exchange' && (
                            <TextInput
                                style={styles.input}
                                placeholder="السعر"
                                value={formik.values.mechanismPrice?.toString()}
                                onChangeText={formik.handleChange("mechanismPrice")}
                                keyboardType="numeric"
                                placeholderTextColor={'#999'}
                            />
                        )}
                    </View>

                    {/* Images */}
                    {type === 'sell' && (
                        <View style={styles.formContainer}>
                            {images.length > 0 ? (
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {images.map((img, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: img.uri }}
                                            style={{ width: 100, height: 100, marginRight: 10, borderRadius: 8 }}
                                        />
                                    ))}
                                </ScrollView>
                            ) : (
                                <TouchableOpacity onPress={pickImage} style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Ionicons name="image-outline" size={60} color="grey" />
                                    <Text style={{ color: "grey" }}>قم برفع الصور بحد اقصي 15 صور</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}

                    {/* Submit */}
                    <TouchableOpacity style={styles.uploadButton} onPress={() => formik.handleSubmit()}>
                        {loading ? <ActivityIndicator color="#FFF" size="large" /> :
                            <Text style={styles.uploadButtonText}>
                                {type === 'buy' ? 'اضغط هنا للبحث' : 'اضغط هنا لارسال الطلب'}
                            </Text>

                        }
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </BaseLayout >
    );
};