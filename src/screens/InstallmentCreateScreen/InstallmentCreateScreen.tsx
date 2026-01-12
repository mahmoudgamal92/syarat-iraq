import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import { useFormik } from 'formik';
import ToggleSwitch from 'toggle-switch-react-native'


import { useCars } from '@hooks';
import { CarRequest } from '@types';
import { BaseLayout, Dropdown, Header, ValidationError, OptionsSheetRef, OptionsSheet, OptionItem, Loader } from '@components';
import { getValidationSchema, initialValues } from './const';
import { countries, clinders, carStatus, cities } from '@constants';
import { styles } from './styles';

export const InstallmentFormScreen = ({ route, navigation }) => {
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
  } = useCars();

  const [images, setImages] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const optionsRef = useRef<OptionsSheetRef>(null);
  useEffect(() => {
    getBrands();
    getEngineSizes();
    getCVTTypes();
    getGasTypes();
    getCarDetails();
  }, []);



  const handleSelectedOptions = (selected) => {
    setOptions(selected);
  };

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
      formik.setFieldValue("carImages", selected);
    }
  };


  const formik = useFormik<CarRequest>({
    initialValues,
    validationSchema: getValidationSchema('installment'),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('requestType', '3');
      formData.append('carType', '1');
      formData.append('brandId', String(values.brandId));
      formData.append('modalId', String(values.modalId));
      formData.append('carEngineSizeId', String(values.carEngineSizeId));
      formData.append('cvtTypeId', String(values.cvtTypeId));
      formData.append('gasTypeId', String(values.gasTypeId));
      formData.append('carImportCountry', values.carImportCountry);
      formData.append('carYear', String(values.carYear));
      formData.append('clinderNumber', String(values.clinderNumber));
      formData.append('carStatus', String(values.carStatus));
      formData.append('carNumber', values.carNumber);
      formData.append('carLocation', values.carLocation);
      formData.append('carOdometer', String(values.carOdometer));
      formData.append('carPrice', String(values.carPrice));
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('replaceByModalId', String(values.replaceByModalId));
      formData.append('replaceByBrandId', String(values.replaceByBrandId));
      formData.append('fromYear', values.fromYear);
      formData.append('toYear', values.toYear);
      formData.append('moreDetailIds', options.map(o => o.id).join(','));
      values.carImages.length > 0 && (
        values.carImages.forEach((img, index) => {
          formData.append('carImages', { uri: img.uri, type: img.type, name: img.name } as any);
        }));
      formData.append('paymentPeriod', values.paymentPeriod);
      formData.append('deposit', values.deposit);
      formData.append('bankName', values.bankName);
      formData.append('isSponser', values.isSponser ? 'true' : 'false');
      formData.append('isEmployee', values.isEmployee ? 'true' : 'false');
      createCarRequest(formData);
      console.log(formData);
    },
  });


  const scrollRef = useRef<ScrollView>(null);



  return (
    <BaseLayout>
      <View style={styles.container}>
        <Loader visible={loading} />
        <Header />
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1, padding: 10 }}
        >
          <Text style={styles.instructions}>
            اعرض سيارتك للتقسيط
          </Text>


          <Text style={styles.instructions}>
            يمكنك تعبئة الحقول التالية لعرض سيارتك بنظام التقسيط
          </Text>

          <>
            <ValidationError<CarRequest> formik={formik} fields={['paymentPeriod', 'deposit']} />
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="مده التسديد"
                value={formik.values.paymentPeriod}
                onChangeText={formik.handleChange("paymentPeriod")}
                placeholderTextColor={'#999'}

              />
              <TextInput
                style={styles.input}
                placeholder="دفعه مقدمه"
                value={formik.values.deposit}
                onChangeText={formik.handleChange("deposit")}
                placeholderTextColor={'#999'}

              />
            </View>
          </>


          <ValidationError<CarRequest> formik={formik} fields={['bankName']} />
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="المصرف"
              value={formik.values.bankName}
              onChangeText={formik.handleChange("bankName")}
              placeholderTextColor={'#999'}

            />
          </View>




          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingHorizontal: 10 }}>
            <ToggleSwitch
              isOn={formik.values.isSponser}
              onColor="green"
              offColor="red"
              label="شرط كفيل ؟"
              labelStyle={{ color: "black", fontFamily: 'Bold' }}
              size="large"
              onToggle={isOn => formik.setFieldValue("isSponser", isOn)}
            />

            <ToggleSwitch
              isOn={formik.values.isEmployee}
              onColor="green"
              offColor="red"
              label="شرط موظف ؟"
              labelStyle={{ color: "black", fontFamily: 'Bold' }}
              size="large"
              onToggle={isOn => formik.setFieldValue("isEmployee", isOn)}
            />
          </View>






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
              searchable
              data={models}
              labelField="name"
              valueField="id"
              placeholder="الموديل + الفئه"
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
              placeholder="الوارد ( بلد المنشآ )"
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
              dropdownPosition='top'
              data={carStatus}
              labelField="label"
              valueField="value"
              placeholder="حاله السياره"
              value={formik.values.carStatus}
              onChange={item => formik.setFieldValue("carStatus", item.value)}
            />
            <Dropdown
              dropdownPosition='top'
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
              dropdownPosition='top'
              labelField="label"
              valueField="value"
              placeholder="رقم اللوحه"
              value={formik.values.carNumber}
              onChange={item => formik.setFieldValue("carNumber", item.value)}
            />

            <Dropdown
              data={cities}
              dropdownPosition='top'
              labelField="label"
              valueField="value"
              placeholder="مكان التواجد"
              value={formik.values.carLocation}
              onChange={item => formik.setFieldValue("carLocation", item.value)}
            />
          </View>



          {/* Conditional fields for sell / other */}
          <>
            <ValidationError<CarRequest> formik={formik} fields={['carYear', 'phoneNumber']} />
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="سنه الصنع"
                value={formik.values.carYear?.toString()}
                onChangeText={formik.handleChange("carYear")}
                keyboardType="numeric"
                placeholderTextColor={'#999'}
              />
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

          {/* Kilometers & Price */}
          <>
            <ValidationError<CarRequest> formik={formik} fields={['carOdometer', 'carPrice']} />
            <View style={styles.row}>
              <TextInput
                style={styles.input}

                placeholder="شكد ماشيه السياره"
                value={formik.values.carOdometer?.toString()}
                onChangeText={formik.handleChange("carOdometer")}
                keyboardType="numeric"
                placeholderTextColor={'#999'}
                returnKeyType="done"
                onSubmitEditing={() => {
                  scrollRef.current?.scrollToEnd({ animated: true });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="السعر بالدولار"
                value={formik.values.carPrice?.toString()}
                onChangeText={formik.handleChange("carPrice")}
                keyboardType="numeric"
                placeholderTextColor={'#999'}
                returnKeyType="done"
                onSubmitEditing={() => {
                  scrollRef.current?.scrollToEnd({ animated: true });
                }}
              />
            </View>
          </>





          {/* Images */}
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



          <View style={styles.formContainer}>
            {options.length > 0 ?
              <>
                <Text style={{
                  fontFamily: 'Regular',
                  textAlign: 'right',
                }}>
                  مواصفات السياره
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}
                >
                  <View style={{ flexShrink: 1 }}>
                    <OptionItem
                      text="اضافه اخري"
                      onPress={() => optionsRef.current?.open()}
                      icon="plus"
                      selected
                    />
                  </View>

                  {options.map((option, index) => (
                    <View key={index} style={{ flexShrink: 1 }}>
                      <OptionItem
                        text={option.name}
                        onPress={() => { }}
                        icon="car"
                        selected
                      />
                    </View>
                  ))}
                </View>
              </>

              :
              <TouchableOpacity onPress={() => optionsRef.current?.open()} style={{ alignItems: 'center' }}>
                <FontAwesome5 name='car' size={60} color="grey" />
                <Text style={{ color: 'grey', fontFamily: 'Regular' }}>قم باختيار باقي مواصفات السياره</Text>
              </TouchableOpacity>
            }
          </View>



          {/* Submit */}
          <TouchableOpacity
            disabled={loading}
            style={styles.uploadButton} onPress={() => {
              console.log(formik.errors);
              formik.handleSubmit()
            }}>
            <Text style={styles.uploadButtonText}>
              اضغط هنا لارسال الطلب
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <OptionsSheet ref={optionsRef} data={carDetails} onChange={handleSelectedOptions} />

      </View >
    </BaseLayout >
  );
};