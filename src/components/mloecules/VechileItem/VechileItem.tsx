import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    StyleSheet,
} from "react-native";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";

interface CarImage {
    imageBase64: string;
}

interface Vechile {
    id: string;
    name: string;
    mainImage?: string;
    mechanismEngineType?: string;
    modalName?: string;
    mechanismImportCountry?: string;
    gasType?: string;
    mechanismOdometer?: string;
    carPrice?: string;
    price?: string;
    phone?: string;
    phoneNumber?: string;
    carImages?: CarImage[];
}

interface CarItemProps {
    vechile: Vechile;
    onShowImages: (images: string[]) => void;
    onShowVideo?: () => void;
    onShowDetails?: () => void;
}

export const VechileItem: React.FC<CarItemProps> = ({
    vechile,
    onShowImages,
    onShowVideo,
    onShowDetails,
}) => {
    const getImageURL = (image?: string) => {
        if (!image) return null;
        return image.replace(/^"|"$/g, "").replace(/\s/g, "").replace(/,+$/, "");
    };

    const handleCall = () => {
        if (!vechile.phoneNumber) return;
        const cleanNumber = vechile.phoneNumber
            .replace(/[^\d+]/g, "")
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
        Linking.openURL(`tel:${cleanNumber}`)
            .catch((err) => console.error("Failed to open dialer:", err));
    };


    const handleShowImages = () => {
        const imageArray =
            vechile.carImages?.map((item) => item.imageBase64) ?? [];
        onShowImages(imageArray);
    };

    return (
        <View key={vechile.id} style={styles.card}>
            {/* Car Info */}
            <View style={styles.row}>
                <View style={styles.carDetails}>
                    <Text style={styles.carName}>{vechile.name}</Text>
                    <Text style={styles.carHint}>منذ ساعه</Text>

                    <Text style={styles.info}>
                        المحرك: <Text style={styles.highlight}>{vechile.mechanismEngineType}</Text>
                    </Text>
                    <Text style={styles.info}>
                        موديل الاليه: <Text style={styles.highlight}>{vechile.modalName}</Text>
                    </Text>
                    <Text style={styles.info}>
                        الوارد:{" "}
                        <Text style={styles.highlight}>{vechile.mechanismImportCountry}</Text>
                    </Text>
                    <Text style={styles.info}>
                        نوع الوقود: <Text style={styles.highlight}>{vechile.gasType}</Text>
                    </Text>
                    <Text style={styles.info}>
                        عدد الكيلومترات:{" "}
                        <Text style={styles.highlight}>{vechile.mechanismOdometer}</Text>
                    </Text>
                    <Text style={styles.info}>
                        السعر: <Text style={styles.highlight}>{vechile.carPrice}</Text>
                    </Text>
                </View>

                <View style={{ width: "50%", height: 200 }}>


                    <Image
                        source={
                            getImageURL(vechile.mainImage)
                                ? { uri: getImageURL(vechile.mainImage) }
                                : require("@assets/images/excavator.png")
                        }
                        style={styles.carImage}
                        resizeMode="cover"
                    />
                </View>
            </View>


            {/* Action Buttons */}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.callButton} onPress={handleShowImages}>
                    <Text style={styles.callText}>عرض الصور</Text>
                    <Entypo name="images" size={16} color="#FFF" />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.callButton} onPress={onShowVideo}>
                    <Text style={styles.callText}>عرض الفيديو</Text>
                    <AntDesign name="camera" size={16} color="#FFF" />
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                    <Text style={styles.callText}>تواصل </Text>

                    <Ionicons name="call" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
});
