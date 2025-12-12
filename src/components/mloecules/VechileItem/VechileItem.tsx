import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
} from "react-native";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { styles } from "./styles";
import { IMAGE_URL } from "@constants";
interface MechanismImage {
    imageBase64: string;
}

interface Vechile {
    id: string;
    mechanismType: string;
    brandName: string;
    modalName: string;
    mechanismEngineType: string;
    mechanismImportCountry: string;
    mechanismYear: number;
    type: string; // "0" from API
    mechanismStatus: string; // e.g. "Damaged"
    mechanismLocation: string;
    mechanismNumber: string;
    mechanismOdometer: number;
    mechanismPrice: number;
    phoneNumber: string;
    mechanismDescription: string | null;
    requestDate: string; // ISO date string
    mainImage: string;
    mechanismImages: MechanismImage[];
}

interface VechileItemProps {
    vechile: Vechile;
    onShowImages: (images: string[]) => void;
    onShowVideo?: () => void;
}

export const VechileItem: React.FC<VechileItemProps> = ({
    vechile,
    onShowImages,
    onShowVideo,
}) => {

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
            vechile.mechanismImages?.map((item) => item.imageBase64) ?? [];
        onShowImages(imageArray);
    };

    return (
        <View key={vechile.id} style={styles.card}>
            {/* Car Info */}
            <View style={styles.row}>
                <View style={styles.carDetails}>
                    <Text style={styles.reqDate}>
                        {moment(vechile.requestDate).startOf('hour').fromNow()}
                    </Text>

                    <View style={{
                        backgroundColor: '#FFD700',
                        borderRadius: 10,
                        paddingHorizontal: 10
                    }}>
                        <Text style={[styles.info, {
                            fontFamily: 'Bold',
                            color: '#000'
                        }]}>
                            السعر: <Text style={{}}>{vechile.mechanismPrice}</Text> دولار
                        </Text>
                    </View>



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
                        عدد الكيلومترات:{" "}
                        <Text style={styles.highlight}>{vechile.mechanismOdometer}</Text>
                    </Text>


                    <Text style={styles.info}>
                        مكان التواجد:{" "}
                        <Text style={styles.highlight}>{vechile.mechanismLocation}</Text>
                    </Text>



                    <Text style={styles.info}>
                        رقم اللوحه :{" "}
                        <Text style={styles.highlight}>{vechile.mechanismNumber}</Text>
                    </Text>



                    <Text style={styles.info}>
                        سنه الصنع  :{" "}
                        <Text style={styles.highlight}>{vechile.mechanismYear}</Text>
                    </Text>




                    <Text style={styles.info}>
                        حاله الاليه :{" "}
                        <Text style={styles.highlight}>{vechile.mechanismStatus}</Text>
                    </Text>

                </View>

                <View style={{ width: "50%", height: 200 }}>
                    <Image
                        source={{ uri: IMAGE_URL + vechile.mainImage }}
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

                <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                    <Text style={styles.callText}>تواصل </Text>

                    <Ionicons name="call" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};