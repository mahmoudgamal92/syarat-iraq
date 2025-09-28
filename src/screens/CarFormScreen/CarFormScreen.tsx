import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, ImageBackground } from 'react-native';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';

import { useCars } from '@hooks';
import { CarRequest } from '@types';
import { BaseLayout, Dropdown, Header, ValidationError } from '@components';
import { OptionsSheetRef, OptionsSheet } from './components';
import { styles } from './styles';
import { getValidationSchema, initialValues } from './const';
import { countries, clinders, carStatus, cities } from '@constants';
import { colors } from '@constants/colors';

export const CarFormScreen = ({ route }) => {
  const { type } = route?.params ?? {};
  const {
    loading,
    brands,
    models,
    cvtTypes,
    engineSizes,
    gasTypes,
    carDetails,
    getBrands,
    getModels,
    getCVTTypes,
    getEngineSizes,
    getGasTypes,
    getCarDetails,
    createCarRequest,
    getCarList
  } = useCars();

  const [images, setImages] = useState<any[]>([]);
  const optionsRef = useRef<OptionsSheetRef>(null);

  useEffect(() => {
    getBrands();
    getEngineSizes();
    getCVTTypes();
    getGasTypes();
    getCarDetails();
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

  const formik = useFormik<CarRequest>({
    initialValues,
    validationSchema: getValidationSchema(type),
    onSubmit: async (values) => {
      const formData: CarRequest = {
        requestType: type === 'buy' ? 1 : 2,
        brandId: values.brandId,
        modalId: values.modalId,
        carEngineSizeId: values.carEngineSizeId,
        cvtTypeId: values.cvtTypeId,
        gasTypeId: values.gasTypeId,
        carImportCountry: values.carImportCountry,
        carYear: Number(values.carYear),
        clinderNumber: Number(values.clinderNumber),
        //carType: Number(values.carType),
        carStatus: Number(values.carStatus),
        carNumber: values.carNumber,
        carLocation: values.carLocation,
        carOdometer: Number(values.carOdometer),
        carPrice: Number(values.carPrice),
        phoneNumber: values.phoneNumber,
        replaceByModalId: values.replaceByModalId,
        carImages: "",
        replaceByBrandId: values.replaceByBrandId,
        fromYear: values.fromYear,
        toYear: values.toYear,
        moreDetailIds: "",
      };

      if (type === 'buy') {
        const cars = await getCarList(formData);
        cars.length === 0 ? alert('لا يوجد سيارات متوفره حاليا') :
          alert(`يوجد ${cars.length} سيارات متوفره حاليا`);
        return;
      }
      createCarRequest(formData);
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
              'تدور علي سياره ؟؟'
              : type === 'exchange'
                ? 'تريد تراوس سيارتك'
                : 'أعرض سيارتك للبيع'
            }
          </Text>


          <Text style={styles.instructions}>
            {type === 'buy'
              ? 'حدد التفاصيل في الأسفل ودوس على زر البحث'
              : type === 'exchange' ?
                'حدد التفاصيل في الأسفل ودوس على زر البحث'
                : 'أكمل التفاصيل في الأسفل'
            }
          </Text>

          {/* Brand & Model */}
          <ValidationError<CarRequest> formik={formik} fields={['brandId', 'modalId']} />
          <View style={styles.row}>
            <Dropdown
              data={brands}
              labelField="name"
              valueField="id"
              placeholder="العلامه التجاريه"
              value={formik.values.brandId}
              onChange={item => {
                formik.setFieldValue("brandId", item.id);
                getModels(item.id);
              }}
            />
            <Dropdown
              data={models}
              labelField="name"
              valueField="id"
              placeholder="الفئة"
              value={formik.values.modalId}
              onChange={item => formik.setFieldValue("modalId", item.id)}
            />

          </View>


          {/* Engine & CVT */}
          <ValidationError<CarRequest> formik={formik} fields={['carEngineSizeId', 'cvtTypeId']} />
          <View style={styles.row}>
            <Dropdown
              data={engineSizes}
              labelField="sizeName"
              valueField="id"
              placeholder="حجم المحرك"
              value={formik.values.carEngineSizeId}
              onChange={item => formik.setFieldValue("carEngineSizeId", item.id)}

            />
            <Dropdown
              data={cvtTypes}
              labelField="name"
              valueField="id"
              placeholder="نوع الكير"
              value={formik.values.cvtTypeId}
              onChange={item => formik.setFieldValue("cvtTypeId", item.id)}
            />
          </View>

          {/* Country & Gas */}
          <ValidationError<CarRequest> formik={formik} fields={['carImportCountry', 'gasTypeId']} />
          <View style={styles.row}>
            <Dropdown
              data={countries}
              labelField="label"
              valueField="value"
              placeholder="الوارد"
              value={formik.values.carImportCountry}
              onChange={item => formik.setFieldValue("carImportCountry", item.value)}
            />
            <Dropdown
              data={gasTypes}
              labelField="type"
              valueField="id"
              placeholder="نوع الوقود"
              value={formik.values.gasTypeId}
              onChange={item => formik.setFieldValue("gasTypeId", item.id)}
            />
          </View>

          {/* Car Status & Cylinders */}
          <ValidationError<CarRequest> formik={formik} fields={['carStatus', 'clinderNumber']} />
          <View style={styles.row}>
            <Dropdown
              data={carStatus}
              labelField="label"
              valueField="value"
              placeholder="حاله السياره"
              value={formik.values.carStatus}
              onChange={item => formik.setFieldValue("carStatus", item.value)}
            />
            <Dropdown
              data={clinders}
              labelField="label"
              valueField="value"
              placeholder="عدد السلندرات"
              value={formik.values.clinderNumber}
              onChange={item => formik.setFieldValue("clinderNumber", item.value)}
            />
          </View>

          {/* Board Number & Location */}
          <ValidationError<CarRequest> formik={formik} fields={['carNumber', 'carLocation']} />
          <View style={styles.row}>
            <Dropdown
              data={cities}
              labelField="label"
              valueField="value"
              placeholder="رقم اللوحه"
              value={formik.values.carNumber}
              onChange={item => formik.setFieldValue("carNumber", item.value)}
            />


            <Dropdown
              data={cities}
              labelField="label"
              valueField="value"
              placeholder="مكان التواجد"
              value={formik.values.carLocation}
              onChange={item => formik.setFieldValue("carLocation", item.value)}
            />

          </View>

          {/* Conditional fields for buy */}
          {type === 'buy' && (
            <>
              <ValidationError<CarRequest> formik={formik} fields={['fromYear', 'toYear']} />
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  placeholder="الموديل من "
                  value={formik.values.fromYear}
                  onChangeText={formik.handleChange("fromYear")}
                  keyboardType="numeric"
                  placeholderTextColor={'#999'}

                />
                <TextInput
                  style={styles.input}
                  placeholder="الموديل الي"
                  value={formik.values.toYear}
                  onChangeText={formik.handleChange("toYear")}
                  keyboardType="numeric"
                  placeholderTextColor={'#999'}

                />
              </View>
            </>

          )}

          {/* Conditional fields for sell / other */}
          {type !== 'buy' && (
            <>
              <ValidationError<CarRequest> formik={formik} fields={['carYear']} />
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  placeholder="سنه الصنع"
                  value={formik.values.carYear?.toString()}
                  onChangeText={formik.handleChange("carYear")}
                  keyboardType="numeric"
                  placeholderTextColor={'#999'}
                />
              </View>
              <ValidationError<CarRequest> formik={formik} fields={['phoneNumber']} />
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
            </>
          )}

          {/* Kilometers & Price */}

          <ValidationError<CarRequest> formik={formik} fields={['carOdometer', 'carPrice']} />
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="شكد ماشيه السياره"
              value={formik.values.carOdometer?.toString()}
              onChangeText={formik.handleChange("carOdometer")}
              keyboardType="numeric"
              placeholderTextColor={'#999'}
            />
            {type !== 'exchange' && (
              <TextInput
                style={styles.input}
                placeholder="السعر"
                value={formik.values.carPrice?.toString()}
                onChangeText={formik.handleChange("carPrice")}
                keyboardType="numeric"
                placeholderTextColor={'#999'}
              />
            )}
          </View>

          {/* Exchange field */}
          {type === 'exchange' && (
            <View>
              <Text style={{
                fontFamily: 'Bold',
                fontSize: 16,
                color: '#000',
                marginBottom: 5,
                alignSelf: 'flex-end',
                paddingHorizontal: 10
              }}>
                آراوس سيارتي ب
              </Text>
              <ValidationError<CarRequest> formik={formik} fields={['replaceByBrandId', 'replaceByModalId']} />
              <View style={styles.row}>
                <Dropdown
                  data={brands}
                  labelField="name"
                  valueField="id"
                  placeholder="العلامه التجاريه"
                  value={formik.values.brandId}
                  onChange={item => {
                    formik.setFieldValue("replaceByBrandId", item.id);
                    getModels(item.id);
                  }}
                />
                <Dropdown
                  data={models}
                  labelField="name"
                  valueField="id"
                  placeholder="الموديل"
                  value={formik.values.modalId}
                  onChange={item => formik.setFieldValue("replaceByModalId", item.id)}
                />

              </View>
            </View>
          )}

          {/* Images */}
          {type === 'sell' && (
            <View style={styles.formContainer}>
              {images.length > 0 ? (
                <>
                  <View style={{
                    paddingVertical: 10
                  }}>
                    <Text style={{ color: 'grey', fontFamily: 'Regular', fontSize: 14, textAlign: 'center' }}>
                      الحد الاقصى للصور هو 15 صوره
                    </Text>
                  </View>

                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {images.map((img, index) => (
                      <View>
                        <ImageBackground
                          key={index}
                          source={{ uri: img.uri }}
                          style={{ width: 100, height: 100, marginRight: 10, }}
                          imageStyle={{ borderRadius: 8 }}
                        >
                          <TouchableOpacity onPress={() => {
                            const newImages = images.filter((_, i) => i !== index);
                            setImages(newImages);
                            formik.setFieldValue("carImages", newImages);
                          }
                          }>
                            <AntDesign name="close-circle" size={24} color="red" />
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>


                    ))}
                  </ScrollView>
                </>
              ) : (
                <TouchableOpacity onPress={pickImage} style={{
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Ionicons name="image-outline" size={60} color="grey" />
                  <Text style={{ color: 'grey', fontFamily: 'Regular' }}>
                    قم برفع الصور بحد اقصي 15 صوره
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Additional Options */}
          {type === 'sell' && (
            <View style={styles.formContainer}>
              <TouchableOpacity onPress={() => optionsRef.current?.open()} style={{ alignItems: 'center' }}>
                <FontAwesome5 name='car' size={60} color="grey" />
                <Text style={{ color: 'grey', fontFamily: 'Regular' }}>قم باختيار باقي مواصفات السياره</Text>


              </TouchableOpacity>
            </View>
          )}

          {type === 'buy' && (
            <Text style={{
              fontFamily: 'Bold',
              color: colors.light.purple,
              textAlign: 'right',
              fontSize: 12,
            }}>
              يمكنك بدء البحث بعد تحديد العلامة التجارية والفئة والموديل فقط  ويمكنك البحث بتحديد كل الإختيارات الظاهرة
            </Text>
          )}

          {/* Submit */}
          <TouchableOpacity
            disabled={loading}
            style={styles.uploadButton} onPress={() => {
              console.log(formik.errors);
              formik.handleSubmit()
            }}>
            <Text style={styles.uploadButtonText}>

              {type === 'buy' ? 'اضغط هنا للبحث' : type === 'exchange' ? 'اضغط هنا لارسال الطلب' : 'اضغط هنا لارسال الطلب'}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <OptionsSheet ref={optionsRef} data={carDetails} />
      </View >
    </BaseLayout >
  );
};