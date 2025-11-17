import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface ImageListProps {
    visible: boolean;
    title?: string;
    images: string[];
    onClose: () => void;
}

export const ImageList: React.FC<ImageListProps> = ({
    visible,
    title = "الصور",
    images,
    onClose,
}) => {
    return (
        <Modal
            visible={visible}
            transparent // ✅ Makes the background transparent
            animationType="fade" // Optional: adds fade animation
            onRequestClose={onClose}
        >
            {/* Overlay */}
            <View style={styles.overlay}>
                {/* Modal Box */}
                <View style={styles.modalBox}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>

                        <Text style={styles.title}>{title}</Text>
                    </View>

                    {/* Images List */}
                    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                        {images.map((uri, index) => (
                            <Image
                                key={index}
                                source={{ uri }}
                                resizeMode="cover"
                                style={styles.image}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)", // ✅ Dim background
        alignItems: "center",
        justifyContent: "center", // ✅ Centers the box
    },
    modalBox: {
        backgroundColor: "#FFF",
        width: "90%",
        borderRadius: 20,
        padding: 10,
        maxHeight: "80%", // ✅ Prevents full height
    },
    header: {
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: {
        fontFamily: "Bold",
        padding: 5,
        fontSize: 16,
    },
    image: {
        height: 200,
        width: "100%",
        marginVertical: 10,
        borderRadius: 10,
    },
});
