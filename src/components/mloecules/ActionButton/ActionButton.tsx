import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface ActionButtonProps {
    title: string;
    onPress: () => void;
    icon?: React.ReactNode; // optional custom icon
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    color?: string; // main color
    subColor?: string; // inner circle color
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    title,
    onPress,
    icon,
    containerStyle,
    textStyle,
    color = "#4A148C",
    subColor = "#7B1FA2",
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: color }, containerStyle]}
        >
            <View style={[styles.circle, { backgroundColor: subColor }]}>
                {icon ?? <Entypo name="circle-with-plus" size={30} color="#FFF" />}
            </View>

            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        height: 50,
        alignItems: "center",
        flexDirection: "row-reverse",
        columnGap: 20,
        marginBottom: 10,
        overflow: "visible",
        paddingHorizontal: 10,
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#FFF",
        fontFamily: "Bold",
        fontSize: 16,
    },
});
