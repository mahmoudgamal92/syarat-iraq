import { colors } from "@constants/colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD'
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#333",
    },
    icon: {
        marginHorizontal: 10,
    },
    card: {
        backgroundColor: "#eeeeee",
        margin: 10,
        borderRadius: 10,
        padding: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    carDetails: {
        flex: 1,
        fontFamily: 'Regular'
    },
    carName: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        fontFamily: 'Regular'

    },
    carHint: {
        color: "#555",
        fontSize: 14,
        marginBottom: 5,
        fontFamily: 'Regular'
    },
    info: {
        color: "#000",
        marginBottom: 3,
        textAlign: 'right',
        fontFamily: 'Regular'
    },
    highlight: {
        color: "#FF8C00",
        fontFamily: 'Regular'
    },
    carImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        marginLeft: 10,
        resizeMode: 'cover',
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    price: {
        color: colors.light.purple,
        fontSize: 16,
        fontWeight: "bold",
    },
    callButton: {
        flexDirection: "row",
        backgroundColor: "#4caf50",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    callText: {
        color: "#fff",
        fontFamily: 'Regular',
        fontSize: 12,
        padding: 2
    },
    errorText: {
        textAlign: 'center',
        color: '#D32F2F',
        fontFamily: 'Regular',
        marginVertical: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#444',
        fontFamily: 'Regular',
        marginVertical: 16,
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#333",
        padding: 10,
    },
    navItem: {
        color: "#fff",
        fontSize: 16,
    },
});