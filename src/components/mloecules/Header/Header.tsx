import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome6, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import { styles } from './styles';
import { colors } from '@constants/colors';

export const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeName = route.name;

  const handleGoBack = () => {
    if (routeName === 'Home' || routeName === 'Profile') {

    } else {
      navigation.goBack();
    }
  }
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => handleGoBack()}>

        {routeName === 'Home' || routeName === 'Profile' ?
          <FontAwesome6 name="car-side" size={30} color={colors.palette.orange} /> :
          <MaterialIcons name="arrow-forward-ios" size={30} color={colors.palette.purple} />
        }
      </TouchableOpacity>


      <View style={styles.carIconContainer}>
        <TouchableOpacity style={styles.HeaderIcon}>
          <Feather name="phone-call" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.HeaderIcon}>
          <FontAwesome name="whatsapp" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};