import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Categorey, BaseLayout } from '@components';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { styles } from './styles';
import { SCREENS } from '@navigation';
import { useNetwork } from '@hooks';
import { ACTION } from '@types';

export const HomeScreen = ({ navigation }) => {
  const isConnected = useNetwork();
  if (isConnected === false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AntDesign name="disconnect" size={50} color="red" />
        <Text style={{
          fontSize: 18,
          fontFamily: 'Bold',
          color: '#333',
        }}>لا يوجد اتصال بالانترنت </Text>
      </View>
    );
  }
  else {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#DDDDDD'
      }}>
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.welcomeSection}>
            <Image
              source={require('@assets/images/banner.png')}
              style={styles.welcomeImage}
            />
            <Text style={styles.welcomeText}>مرحباً بكم</Text>
            <Text style={styles.description}>
              بيع و اشتري بكل سهولة من تطبيق سيارات و آليات العراق
            </Text>
          </View>

          {/* Cars Section */}
          <View style={styles.section}>
            <View style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomColor: 'grey',
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}>
              <TouchableOpacity
                onPress={() => navigation.navigate(SCREENS.CARS.LIST, {
                  type: 'buy'
                })}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#FC6A04',
                  padding: 5,
                  borderRadius: 5
                }}>
                <MaterialIcons name="keyboard-arrow-left" size={24} color="#FFF" />
                <Text style={{ color: '#FFF', fontFamily: 'Regular' }}>
                  كل العروض
                </Text>
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>قسم السيارات</Text>
            </View>


            <View style={styles.buttonsContainer}>
              <Categorey
                onPress={() => navigation.navigate(SCREENS.CARS.LIST, { type: ACTION.EXCHANGE })}
                text={'آراوس سيارتي'}
                icon={require('@assets/images/exchange.png')}
              />

              <Categorey
                onPress={() => navigation.navigate(SCREENS.CARS.FORM, { type: ACTION.BUY })}
                text={'اشتري سياره'}
                icon={require('@assets/images/buy.png')}
              />
              <Categorey
                onPress={() => navigation.navigate(SCREENS.CARS.FORM, { type: ACTION.SELL })}
                text={'ابيع سيارتي'}
                icon={require('@assets/images/sell.png')}
              />
            </View>
          </View>

          {/* Machinery Section */}
          <View style={styles.section}>
            <View style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomColor: 'grey',
              paddingVertical: 10,
              paddingHorizontal: 30,
            }}>
              <TouchableOpacity
                onPress={() => navigation.navigate(SCREENS.VECHILE.LIST)}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#FC6A04',
                  padding: 5,
                  borderRadius: 5
                }}>
                <MaterialIcons name="keyboard-arrow-left" size={24} color="#FFF" />
                <Text style={{ color: '#FFF', fontFamily: 'Regular' }}>
                  كل العروض
                </Text>
              </TouchableOpacity>
              <Text style={[styles.sectionTitle, { color: '#FF9A52' }]}>
                قسم الآليات
              </Text>
            </View>

            <View style={styles.buttonsContainer}>
              <Categorey
                onPress={() => {
                  navigation.navigate(SCREENS.VECHILE.TYPE, {
                    type: 'sell'
                  })
                }}
                text={'ابيع آليتي'}
                icon={require('@assets/images/sell-machine.png')} />
              <Categorey
                onPress={() => {
                  navigation.navigate(SCREENS.VECHILE.TYPE, {
                    type: 'buy'
                  })
                }}
                text={' اشتري آلية'}
                icon={require('@assets/images/buy-machine.png')} />
            </View>
          </View>
        </ScrollView>
      </View >
    );
  }
};