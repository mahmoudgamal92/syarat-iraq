import * as React from 'react';
import { Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, PrivacyPolicyScreen } from './../screens';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5C4CF2',
        tabBarInactiveTintColor: '#FF9A52',
        tabBarStyle: {
          backgroundColor: '#DDDDDD',
          borderTopWidth: 0,
          height: Platform.OS == 'ios' ? 90 : 70,
          borderRadius: 100,
          marginBottom: 20,
          marginHorizontal: 10,
          justifyContent: 'center'
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
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
  );
}