import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, I18nManager, View } from 'react-native';
import { AppStack } from './src/navigation/navigator';
import { useFonts } from "expo-font";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from '@context';
import moment from "moment";
moment.locale('ar');

export default function App() {

  if (__DEV__) {
    import('./src/devtools/ReactotronConfig')
  }
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);

  let [fontsLoaded] = useFonts({
    Bold: require("@assets/fonts/Bold.ttf"),
    Light: require("@assets/fonts/Light.ttf"),
    Regular: require("@assets/fonts/Regular.ttf"),
    Medium: require("@assets/fonts/Medium.ttf"),
    ExtraBold: require("@assets/fonts/ExtraBold.ttf")
  });
  if (!fontsLoaded) {
    return null;
  }



  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <ToastProvider>
          <BottomSheetModalProvider>
            <AppStack />
          </BottomSheetModalProvider>
        </ToastProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
