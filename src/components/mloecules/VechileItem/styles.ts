import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    card: {
        backgroundColor: "#DDDDDD",
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        elevation: 3,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    carDetails: {
        width: "50%",
        alignItems: 'flex-end',
        paddingHorizontal: 10
    },
    carName: {
        fontFamily: "Bold",
        fontSize: 16,
        marginBottom: 5,
    },
    carHint: {
        color: "#888",
        fontSize: 12,
        marginBottom: 5,
    },
    info: {
        color: "#333",
        fontSize: 14,
        marginBottom: 3,
    },
    highlight: {
        color: "#4A148C",
        fontWeight: "bold",
    },
    carImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },
    price: {
        color: "#4A148C",
        fontFamily: "Bold",
        fontSize: 16,
    },
    callButton: {
        backgroundColor: "#4A148C",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8,
    },
    callText: {
        color: "#FFF",
        fontSize: 14,
        fontFamily: "Bold",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        columnGap: 5,
        paddingVertical: 10,
    },
    reqDate: {
        fontFamily: "Regular",
        color: 'grey',
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'left'
    },
});
