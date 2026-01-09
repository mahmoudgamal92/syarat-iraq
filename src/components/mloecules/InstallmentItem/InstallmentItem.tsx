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
import { ACTION } from "@types";
import { styles } from "./styles";
import { IMAGE_URL } from "@constants";
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
    requestDate: string;
    brandName?: string;
    replaceByBrandName?: string;
    replaceByModalName?: string;
}

interface InstallmentItemProps {
    type?: string;
    car: Car;
    onShowImages: (images: string[]) => void;
    onShowVideo?: () => void;
    onShowDetails?: () => void;
}

export const InstallmentItem: React.FC<InstallmentItemProps> = ({
    car,
    type,
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
                    <Text style={styles.reqDate}>
                        {moment(car.requestDate).startOf('hour').fromNow()}
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
                            السعر: <Text style={{}}>{car.carPrice}</Text> دولار
                        </Text>
                    </View>



                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'Bold',
                        marginBottom: 5,
                    }}>
                        {car.brandName} - {car.modalName}
                    </Text>

                    <Text style={styles.info}>
                        سنه الصنع : <Text style={styles.highlight}>{car.carYear}</Text>
                    </Text>

                    <Text style={styles.info}>
                        مده التسديد : <Text style={styles.highlight}>{car.paymentPeriod}</Text>
                    </Text>

                    <Text style={styles.info}>
                        دفعه مقدمه: <Text style={styles.highlight}>{car.deposit} {'دولار'} </Text>
                    </Text>
                    <Text style={styles.info}>
                        المصرف : <Text style={styles.highlight}>{car.bankName}</Text>
                    </Text>
                    <Text style={styles.info}>
                        شرط موظف:{" "}
                        <Text style={styles.highlight}>{car.isEmployee ? "نعم" : "لا"}</Text>
                    </Text>
                    <Text style={styles.info}>
                        شرط كفيل: <Text style={styles.highlight}>{car.isSponsor ? "نعم" : "لا"}</Text>
                    </Text>

                    <Text style={styles.info}>
                        حاله السياره  : <Text style={styles.highlight}>{car.carStatus}</Text>
                    </Text>

                    <Text style={styles.info}>
                        عدد الكيلومترات  : <Text style={styles.highlight}>{car.carOdometer}</Text>
                    </Text>


                    {type === ACTION.EXCHANGE &&
                        <View style={{
                            backgroundColor: '#FFD700',
                            padding: 5,
                            borderRadius: 5,
                        }}>

                            <Text style={[styles.info, {

                            }]}>
                                اراوس ب   : <Text style={styles.highlight}> {car.replaceByBrandName + '-' + car.replaceByModalName}</Text>
                            </Text>
                        </View>
                    }


                </View>

                <View style={{ width: "50%", height: 200 }}>
                    <Image
                        source={{ uri: IMAGE_URL + car.mainImage }}
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
        </View >
    );
};
