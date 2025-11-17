import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabs } from "@navigation/tabs";
import { CarFormScreen, CarListScreen, VehicleFormScreen, VehicleTypeScreen, SplashScreen, VechileListScreen } from '@screens';
import { BaseLayout } from '@components';
import { SCREENS } from './const';

export const AppStack = () => {
    const HomeStack = createStackNavigator();
    return (
        <HomeStack.Navigator
            id={undefined}
            initialRouteName="SplashScreen"
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#FFF' },

            }}
        >
            <HomeStack.Screen name={SCREENS.AUTH.SPLASH} component={SplashScreen} />
            <HomeStack.Screen name="BottomTabs" component={BottomTabs} />

            <HomeStack.Screen name={SCREENS.CARS.FORM} component={CarFormScreen} />
            <HomeStack.Screen name={SCREENS.CARS.LIST} component={CarListScreen} />

            <HomeStack.Screen name={SCREENS.VECHILE.FORM} component={VehicleFormScreen} />
            <HomeStack.Screen name={SCREENS.VECHILE.TYPE} component={VehicleTypeScreen} />
            <HomeStack.Screen name={SCREENS.VECHILE.LIST} component={VechileListScreen} />

        </HomeStack.Navigator>
    );
};


