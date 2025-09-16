import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    tabber: {
        flexDirection: "row-reverse",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
        backgroundColor: "#FFF",
        borderRadius: 20,
        borderColor: "#DDDDDD",
        borderWidth: 1,
        overflow: "hidden",
    },
    tabItem: {
        paddingVertical: 15,
        borderLeftColor: "#DDDDDD",
    },
    tabText: {
        fontFamily: "Regular",
        fontSize: 14,
        textAlign: "center",
        paddingHorizontal: 5,
    },
});

// Your colors object (reuse your existing one)
const colors = {
    BEIGE: "#d7bfa6",
    WHITE: "#ffffff",
};
