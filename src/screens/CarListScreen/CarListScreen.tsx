import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons, AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { carList } from '@constants';

import { styles } from './styles';
import { BaseLayout, Header, Tabber } from '@components';

export const CarListScreen = ({ route, navigation }) => {
    const { type } = route?.params ?? {};

    const [selectedTab, setSelectedTab] = React.useState<number | string>('');

    const tabs = [
        { id: 1, title: " اقل سعر" },
        { id: 2, title: "اعلي سعر" },
        { id: 0, title: "اقل كيلومترات" },
    ];
    return (
        <BaseLayout>
            <Header />
            <ScrollView style={{
                backgroundColor: "#FFF",
                padding: 10,
            }}>
                {type == 'buy' &&
                    <Tabber data={tabs} selected={selectedTab} onSelect={setSelectedTab} />
                }

                {type == 'exchange' &&


                    <TouchableOpacity
                        onPress={() => navigation.navigate('CarFormScreen', { type: 'buy' })}
                        style={{
                            backgroundColor: '#4A148C',
                            borderRadius: 50,
                            height: 50,
                            alignItems: 'center',
                            marginBottom: 10,
                            flexDirection: 'row-reverse',
                            columnGap: 20,
                            overflow: 'visible'
                        }}>
                        <View style={{
                            width: 60,
                            height: 60,
                            borderRadius: 50,
                            backgroundColor: '#7B1FA2',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Entypo name="circle-with-plus" size={30} color="#FFF" />

                        </View>
                        <Text style={{
                            color: '#FFF',
                            fontFamily: 'Bold',
                            fontSize: 16
                        }}>
                            اضغط هنا لعرض سيارتك للمراوس
                        </Text>
                    </TouchableOpacity>

                }
                {carList.map((car) => (
                    <View key={car.id} style={styles.card}>
                        {/* Car Info */}
                        <View style={styles.row}>
                            <View style={styles.carDetails}>
                                <Text style={styles.carName}>{car.name}</Text>
                                <Text style={styles.carHint}>منذ ساعه </Text>
                                <Text style={styles.info}>
                                    المحرك: <Text style={styles.highlight}>{car.engine}</Text>
                                </Text>
                                <Text style={styles.info}>
                                    حالة السيارة: <Text style={styles.highlight}>{car.condition}</Text>
                                </Text>
                                <Text style={styles.info}>
                                    الوارد: <Text style={styles.highlight}>{car.origin}</Text>
                                </Text>
                                <Text style={styles.info}>
                                    نوع الوقود: <Text style={styles.highlight}>{car.gasType}</Text>
                                </Text>
                                <Text style={styles.info}>
                                    عدد الكيلومترات: <Text style={styles.highlight}>{car.kilometers}</Text>
                                </Text>
                                <Text style={styles.info}>
                                    مكان السيارة: <Text style={styles.highlight}>{car.location}</Text>
                                </Text>
                            </View>
                            <View style={{
                                width: '50%',
                                height: 200
                            }}>
                                <Image source={car.image} style={styles.carImage} />

                            </View>
                        </View>

                        {/* Price and Contact */}
                        <View style={styles.footer}>
                            <Text style={styles.price}>{car.price}</Text>
                            <TouchableOpacity style={styles.callButton}>
                                <Text style={styles.callText}>{car.phone}</Text>
                                <Ionicons name="call" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            columnGap: 5,
                            paddingVertical: 10
                        }}>
                            <TouchableOpacity style={styles.callButton}>
                                <Text style={styles.callText}>
                                    عرض الصور
                                </Text>
                                <Entypo name="images" size={16} color="#FFF" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.callButton}>
                                <Text style={styles.callText}>{'عرض الفيديو'}</Text>
                                <AntDesign name="camera" size={16} color="#FFF" />
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.callButton}>
                                <Text style={styles.callText}>
                                    باقي المواصفات
                                </Text>
                                <FontAwesome name="list-ul" size={16} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </BaseLayout>
    );
};
