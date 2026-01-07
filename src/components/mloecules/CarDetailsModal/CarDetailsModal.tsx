import React, { useMemo } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";

import { OptionItem } from "../OptionItem/OptionItem";
import { styles } from "./styles";
import { IMAGE_URL } from "@constants";

interface CarDetailsModalProps {
    car: any;
    visible: boolean;
    onClose: () => void;
}

const DetailRow = ({ label, value }: { label: string; value?: string }) => {
    if (!value) return null;
    return (
        <View style={{
            flexDirection: "row-reverse",
            alignItems: "center",
        }}>
            <FontAwesome5 name="dot-circle" size={24} color="black" style={{ marginHorizontal: 5 }} />
            <Text style={styles.info}>
                {label}: <Text style={styles.highlight}>{value}</Text>
            </Text>
        </View>

    );
};

export const CarDetailsModal: React.FC<CarDetailsModalProps> = ({
    car,
    visible,
    onClose,
}) => {
    const optionList = useMemo(
        () =>
            car?.moreDetails
                ? car.moreDetails.split(",").map((i: string) => i.trim())
                : [],
        [car]
    );

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalBox}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>باقي المواصفات</Text>
                        <TouchableOpacity onPress={onClose}>
                            <AntDesign name="close" size={24} color="#999" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Image */}
                        <Image
                            source={{
                                uri:
                                    IMAGE_URL +
                                    car?.mainImage,
                            }}
                            style={styles.heroImage}
                            resizeMode="cover"
                        />

                        {/* Details Card */}
                        <View style={styles.detailsCard}>
                            <Text style={styles.reqDate}>
                                {moment(car?.requestDate).fromNow()}
                            </Text>

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginVertical: 8,
                            }}>

                                <View>
                                    <DetailRow label="المحرك" value={car?.carEngineSize} />
                                    <DetailRow label="موديل السيارة" value={car?.modalName} />
                                    <DetailRow label="الوارد" value={car?.carImportCountry} />
                                    <DetailRow label="نوع الوقود" value={car?.gasType} />
                                </View>

                                <View>
                                    <DetailRow label="عدد الكيلومترات" value={car?.carOdometer} />
                                    <DetailRow label="الحالة" value={car?.carStatus} />
                                    <DetailRow label="مكان التواجد" value={car?.carLocation} />
                                    <DetailRow label="رقم اللوحة" value={car?.carNumber} />
                                </View>

                            </View>


                        </View>


                        <View>
                            <Text style={{
                                textAlign: "right",
                                fontFamily: "Bold",
                                color: "#333",
                                fontSize: 14,
                                marginBottom: 6,
                            }}>
                                مميزات السياره:
                            </Text>
                        </View>
                        {/* Exchange Info */}
                        {(car?.replaceByBrandName || car?.replaceByModalName) && (
                            <View style={styles.exchangeBox}>
                                <Text style={styles.exchangeText}>
                                    اراوس بـ{" "}
                                    <Text style={styles.highlight}>
                                        {car?.replaceByBrandName} - {car?.replaceByModalName}
                                    </Text>
                                </Text>
                            </View>
                        )}

                        {/* Options */}
                        {optionList.length > 0 && (
                            <View style={styles.optionsContainer}>
                                {optionList.map((item: string, index: number) => (
                                    <OptionItem
                                        key={index}
                                        text={item}
                                        icon="car"
                                        selected
                                        onPress={() => { }}
                                    />
                                ))}
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};
