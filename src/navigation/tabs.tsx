import * as React from 'react';
import { Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, PrivacyPolicyScreen } from './../screens';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BaseLayout } from '@components';

export const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <BaseLayout>
      <Tab.Navigator
        id={undefined}
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#5C4CF2',
          tabBarInactiveTintColor: '#B0B0B0',
          tabBarStyle: {
            backgroundColor: '#FFF',
            borderTopWidth: 0,
            height: Platform.OS == 'ios' ? 90 : 75,
            borderRadius: 100,
            marginBottom: 40,
            marginHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >

        <Tab.Screen name="Profile" component={PrivacyPolicyScreen}
          options={{
            tabBarLabel: ({ color }) =>
              <Text style={{ fontFamily: "Regular", color }}>سياسه الخصوصيه</Text>,
            tabBarIcon: ({ color, size }) =>
              <MaterialIcons name="privacy-tip" size={20} color={color}
              />
          }} />


        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            tabBarLabel: ({ color }) =>
              <Text style={{ fontFamily: "Regular", color }}>الرئيسية</Text>,
            tabBarIcon: ({ color, size }) =>
              <MaterialCommunityIcons
                name="home-search-outline"
                size={20}
                color={color}
              />
          }} />
      </Tab.Navigator>
    </BaseLayout>
  );
}