import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
    },

    modalBox: {
        backgroundColor: "#FFF",
        width: "100%",
        height: "98%",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 16,
    },

    header: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    title: {
        fontFamily: "Bold",
        fontSize: 16,
    },

    scrollContent: {
        paddingBottom: 32,
    },

    heroImage: {
        width: "100%",
        height: 220,
        borderRadius: 16,
        marginBottom: 12,
    },

    detailsCard: {
        backgroundColor: "#F9F9F9",
        borderRadius: 16,
        padding: 14,
        marginBottom: 16,
    },

    reqDate: {
        fontFamily: "Regular",
        color: "#888",
        fontSize: 13,
        marginBottom: 6,
    },

    priceBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#FFD700",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 10,
    },

    priceText: {
        fontFamily: "Bold",
        fontSize: 16,
        color: "#000",
    },

    info: {
        textAlign: "right",
        fontFamily: "Regular",
        color: "#333",
        fontSize: 14,
        marginBottom: 6,
    },

    highlight: {
        color: "#4A148C",
        fontFamily: "Bold",

    },

    exchangeBox: {
        backgroundColor: "#FFF3CD",
        borderRadius: 12,
        padding: 10,
        marginBottom: 16,
    },

    exchangeText: {
        fontSize: 14,
        color: "#333",
    },

    optionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
});
