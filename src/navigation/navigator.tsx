import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabs } from "@navigation/tabs";
import { CarFormScreen, ListScreen, VehicleFormScreen, VehicleTypeScreen, SplashScreen } from '@screens';

export const AppStack = () => {
    const HomeStack = createStackNavigator();
    return (
        <HomeStack.Navigator
            id={undefined}
            initialRouteName="SplashScreen"
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#FFFFFF' },

            }}
        >
            <HomeStack.Screen name="SplashScreen" component={SplashScreen} />
            <HomeStack.Screen name="BottomTabs" component={BottomTabs} />
            <HomeStack.Screen name="CarFormScreen" component={CarFormScreen} />
            <HomeStack.Screen name="VehicleFormScreen" component={VehicleFormScreen} />
            <HomeStack.Screen name="VehicleTypeScreen" component={VehicleTypeScreen} />
            <HomeStack.Screen name="ListScreen" component={ListScreen} />
        </HomeStack.Navigator>

    );
};


