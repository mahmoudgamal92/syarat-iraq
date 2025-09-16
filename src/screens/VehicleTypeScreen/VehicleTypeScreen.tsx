import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { categories } from '@constants';
import { BaseLayout, Header } from '@components';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMechanism } from '@hooks';

type RootStackParamList = {
  VehicleFormScreen: { type: string };
};

export const VehicleTypeScreen = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { mechanismTypes, getMechanismTypes } = useMechanism();
  const { type } = route?.params ?? {};

  useEffect(() => {
    getMechanismTypes();
  }
    , []);
  return (

    <BaseLayout>
      <View style={styles.container}>
        <Header />
        {/* Title */}
        <Image source={require('@assets/images/louder.png')} style={styles.image} />
        <Text style={styles.title}>إختر نوع الآلية</Text>

        {/* Buttons Grid */}
        <View style={styles.grid}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, { backgroundColor: item.color }]}
              onPress={() => navigation.navigate('VehicleFormScreen', { type: type })}
            >
              <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>

    </BaseLayout >
  );
};
