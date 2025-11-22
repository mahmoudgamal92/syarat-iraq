import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    StyleSheet,
} from "react-native";
import { Ionicons, Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
import moment from "moment";
moment.locale('ar');

interface CarImage {
    imageBase64: string;
}

interface Car {
    id: string;
    name: string;
    mainImage?: string;
    carEngineSize?: string;
    modalName?: string;
    carImportCountry?: string;
    gasType?: string;
    carOdometer?: string;
    carPrice?: string;
    price?: string;
    phone?: string;
    phoneNumber?: string;
    carStatus?: string;
    carLocation?: string;
    carNumber?: string;
    carImages?: CarImage[];
    requestDate: string
}

interface CarItemProps {
    car: Car;
    onShowImages: (images: string[]) => void;
    onShowVideo?: () => void;
    onShowDetails?: () => void;
}

export const CarItem: React.FC<CarItemProps> = ({
    car,
    onShowImages,
    onShowVideo,
    onShowDetails,
}) => {
    const getImageURL = (image?: string) => {
        if (!image) return null;
        return image.replace(/^"|"$/g, "").replace(/\s/g, "").replace(/,+$/, "");
    };

    const handleCall = () => {
        if (!car.phoneNumber) return;
        const cleanNumber = car.phoneNumber
            .replace(/[^\d+]/g, "")
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
        Linking.openURL(`tel:${cleanNumber}`)
            .catch((err) => console.error("Failed to open dialer:", err));
    };


    const handleShowImages = () => {
        const imageArray =
            car.carImages?.map((item) => item.imageBase64) ?? [];
        onShowImages(imageArray);
    };

    return (
        <View key={car.id} style={styles.card}>
            {/* Car Info */}
            <View style={styles.row}>
                <View style={styles.carDetails}>
                    <Text style={styles.reqDate}>{
                        moment(car.requestDate).startOf('hour').fromNow()}</Text>
                    <View style={{
                        backgroundColor: '#FFD700',
                        borderRadius: 10,
                        paddingHorizontal: 10
                    }}>
                        <Text style={[styles.info, {
                            fontFamily: 'Bold',
                            color: '#000'
                        }]}>
                            السعر: <Text style={{}}>{car.carPrice}</Text> دولار
                        </Text>
                    </View>


                    <Text style={styles.info}>
                        المحرك: <Text style={styles.highlight}>{car.carEngineSize}</Text>
                    </Text>
                    <Text style={styles.info}>
                        موديل السيارة: <Text style={styles.highlight}>{car.modalName}</Text>
                    </Text>
                    <Text style={styles.info}>
                        الوارد:{" "}
                        <Text style={styles.highlight}>{car.carImportCountry}</Text>
                    </Text>
                    <Text style={styles.info}>
                        نوع الوقود: <Text style={styles.highlight}>{car.gasType}</Text>
                    </Text>
                    <Text style={styles.info}>
                        عدد الكيلومترات:{" "}
                        <Text style={styles.highlight}>{car.carOdometer}</Text>
                    </Text>

                    <Text style={styles.info}>
                        الحاله: <Text style={styles.highlight}>{car.carStatus}</Text>
                    </Text>

                    <Text style={styles.info}>
                        مكان التواجد : <Text style={styles.highlight}>{car.carLocation}</Text>
                    </Text>

                    <Text style={styles.info}>
                        رقم اللوحه  : <Text style={styles.highlight}>{car.carNumber}</Text>
                    </Text>
                </View>

                <View style={{ width: "50%", height: 200 }}>


                    <Image
                        source={{ uri: 'https://services.sayarat-iraq.com/uploads/ImagesRepository/' + car.mainImage }}
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

                <TouchableOpacity style={styles.callButton} onPress={onShowVideo}>
                    <Text style={styles.callText}>عرض الفيديو</Text>
                    <AntDesign name="camera" size={16} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.callButton} onPress={onShowDetails}>
                    <Text style={styles.callText}>باقي المواصفات</Text>
                    <FontAwesome name="list-ul" size={16} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                    <Text style={styles.callText}>تواصل </Text>

                    <Ionicons name="call" size={16} color="#fff" />
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
    reqDate: {
        fontFamily: "Regular",
        color: 'grey',
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'left'
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
        fontSize: 8,
        fontFamily: "Regular",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        columnGap: 2,
        paddingVertical: 10,
    },
});
