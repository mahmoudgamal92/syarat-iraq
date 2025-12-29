import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';

import { useMechanism } from '@hooks';
import { ACTION, MechanismRequest } from '@types';

import { countries, cities, vechileStatus } from '@constants';
import { BaseLayout, Dropdown, Header, ValidationError } from '@components';

import { getValidationSchema, initialValues } from './const';
import { styles } from './styles';
import { SCREENS } from '@navigation';

export const VehicleFormScreen = ({ route, navigation }) => {
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
            quality: 0.8,
        });
        if (!result.canceled && result.assets) {
            const selected = result.assets.map(asset => ({
                uri: asset.uri,
                type: asset.mimeType || 'image/jpeg',
                name: asset.fileName || `image_${Date.now()}.jpg`,
            }));
            setImages(selected);
            formik.setFieldValue("mechanismImages", selected);
        }
    };

    const formik = useFormik<MechanismRequest>({
        initialValues,
        validationSchema: getValidationSchema(type),
        onSubmit: async (values) => {
            const searchForm: MechanismRequest = {
                mechanismTypeId: mechanism.id,
                mechanismBrandId: values.mechanismBrandId,
                mechanismModalId: values.mechanismModalId,
                mechanismEngineTypeId: values.mechanismEngineTypeId,
                mechanismImportCountry: values.mechanismImportCountry,
                mechanismYear: values.mechanismYear,
                mechanismStatus: values.mechanismStatus,
                mechanismLocation: values.mechanismLocation,
                mechanismNumber: values.mechanismNumber,
                mechanismOdometer: values.mechanismOdometer,
                mechanismPrice: values.mechanismPrice,
                phoneNumber: values.phoneNumber,
                mechanismImages: values.mechanismImages,
            };

            const formData = new FormData();
            formData.append("mechanismTypeId", mechanism.id.toString());
            formData.append("mechanismBrandId", values.mechanismBrandId.toString());
            formData.append("mechanismModalId", values.mechanismModalId.toString());
            formData.append("mechanismEngineTypeId", values.mechanismEngineTypeId.toString());
            formData.append("mechanismImportCountry", values.mechanismImportCountry);
            formData.append("mechanismYear", values.mechanismYear.toString());
            formData.append("mechanismStatus", values.mechanismStatus.toString());
            formData.append("mechanismLocation", values.mechanismLocation);
            formData.append("mechanismNumber", values.mechanismNumber.toString());
            formData.append("mechanismOdometer", values.mechanismOdometer.toString());
            formData.append("mechanismPrice", values.mechanismPrice.toString());
            formData.append("phoneNumber", values.phoneNumber);
            values.mechanismImages.length > 0 && (
                values.mechanismImages.forEach((img, index) => {
                    formData.append('mechanismImages', {
                        uri: img.uri,
                        type: img.type,
                        name: img.name,
                    } as any);
                }));

            if (type === ACTION.BUY) {
                navigation.navigate(SCREENS.VECHILE.LIST, {
                    type,
                    filters: values
                });
                return;
            }
            createMechanismRequest(formData);
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
                            placeholder="نوع المحرك"
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

                    {/* Kilometers & Price */}
                    {type === 'sell' && (
                        <>
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
                                <TextInput
                                    style={styles.input}
                                    placeholder="السعر بالدولار"
                                    value={formik.values.mechanismPrice?.toString()}
                                    onChangeText={formik.handleChange("mechanismPrice")}
                                    keyboardType="numeric"
                                    placeholderTextColor={'#999'}
                                />
                            </View>

                        </>
                    )}


                    {/* Images */}
                    {type === 'sell' && (
                        <View style={styles.formContainer}>
                            {images.length > 0 ? (
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {/* {images.map((img, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: img.uri }}
                                            style={{ width: 100, height: 100, marginRight: 10, borderRadius: 8 }}
                                        />
                                    ))} */}


                                    {images.map((img, index) => (
                                        <View>
                                            <ImageBackground
                                                key={index}
                                                source={{ uri: img.uri }}
                                                style={{ width: 100, height: 100, marginRight: 10, }}
                                                imageStyle={{ borderRadius: 8 }}
                                            >
                                                <TouchableOpacity
                                                    style={{
                                                        padding: 3
                                                    }}
                                                    onPress={() => {
                                                        const newImages = images.filter((_, i) => i !== index);
                                                        setImages(newImages);
                                                        formik.setFieldValue("carImages", newImages);
                                                    }
                                                    }>
                                                    <FontAwesome name="minus-circle" size={24} color="red" />
                                                </TouchableOpacity>
                                            </ImageBackground>
                                        </View>


                                    ))}


                                </ScrollView>
                            ) : (
                                <TouchableOpacity onPress={pickImage} style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Ionicons name="image-outline" size={60} color="grey" />
                                    <Text style={{ color: "grey", fontFamily: "Regular" }}>قم برفع الصور بحد اقصي 15 صور</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}

                    {/* Submit */}
                    <TouchableOpacity style={styles.uploadButton}
                        onPress={() => {
                            console.log(formik.errors);
                            formik.handleSubmit()
                        }}>
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