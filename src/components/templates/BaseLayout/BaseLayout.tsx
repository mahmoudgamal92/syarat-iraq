import React, { ReactNode } from "react";
import { View, StatusBar, StyleSheet, SafeAreaView, Platform } from "react-native";
import Constants from 'expo-constants';

interface BaseLayoutProps {
    children: ReactNode;
    backgroundColor?: string;
    barStyle?: "light-content" | "dark-content";
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
    children,
    backgroundColor = "#DDDDDD",
}) => {
    return (
        <View style={[styles.safeArea, { backgroundColor, paddingTop: Constants.statusBarHeight }]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});
