import React from 'react';
import { View, Text } from 'react-native';
import { FormikProps } from 'formik';

interface FormErrorsRowProps<T> {
    formik: FormikProps<T>;
    fields: (keyof T)[];
}

export const ValidationError = <T extends {}>({ formik, fields }: FormErrorsRowProps<T>) => {
    return (
        <View style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
        }}>
            {fields.map((field, index) => {
                const error = formik.errors[field];
                const touched = formik.touched[field];

                return (
                    <View key={index} style={{ flex: 0.5 }}>
                        {error && touched && (
                            <Text style={{ color: 'red', fontFamily: 'Regular', textAlign: 'right' }}> * {error}</Text>
                        )}
                    </View>
                );
            })}
        </View>
    );
};





