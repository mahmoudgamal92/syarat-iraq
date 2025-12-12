import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BaseLayout, Header, Loader } from '@components';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMechanism } from '@hooks';
import { colors } from '@constants/colors';
import { SCREENS } from '@navigation';

type RootStackParamList = {
  VehicleFormScreen: { type: string; mechanism: any };
};

export const VehicleTypeScreen = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { loading, mechanismTypes, getMechanismTypes } = useMechanism();
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
        <Image source={type === 'buy' ? require('@assets/images/buy-machine.png') : require('@assets/images/sell-machine.png')} style={styles.image} />
        <Text style={styles.title}>إختر نوع الآلية</Text>
        {loading ? <Loader visible={loading} /> :
          <View style={styles.grid}>
            {mechanismTypes.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, { backgroundColor: colors.palette.purple }]}
                onPress={() => navigation.navigate(SCREENS.VECHILE.FORM, { type: type, mechanism: item })}
              >
                <Text style={styles.buttonText}>{item.name}</Text>
                <MaterialCommunityIcons name="dharmachakra" size={30} color="#FFF" />
              </TouchableOpacity>
            ))}
          </View>
        }

      </View>

    </BaseLayout >
  );
};
