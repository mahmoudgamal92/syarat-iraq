import React, { ReactNode } from "react";
import { View, StatusBar, StyleSheet, SafeAreaView } from "react-native";

interface BaseLayoutProps {
    children: ReactNode;
    backgroundColor?: string;
    barStyle?: "light-content" | "dark-content";
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
    children,
    backgroundColor = "#fff",
    barStyle = "dark-content",
}) => {
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
            <StatusBar translucent backgroundColor="transparent" barStyle={barStyle} />
            <View style={[styles.container, { backgroundColor }]}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
});