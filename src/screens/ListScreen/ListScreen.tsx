import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons, AntDesign,Entypo ,FontAwesome} from '@expo/vector-icons';
import { carList } from '@constants';

import { styles } from './styles';
import { Header } from '@components';

export const ListScreen = () => {

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView>
                {carList.map((car) => (
                    <View key={car.id} style={styles.card}>
                        {/* Car Info */}
                        <View style={styles.row}>
                            <View style={styles.carDetails}>
                                <Text style={styles.carName}>{car.name}</Text>
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
                                    عدد السلندرات: <Text style={styles.highlight}>{car.cylinders}</Text>
                                </Text>
                                <Text style={styles.info}>
                                    لون: <Text style={styles.highlight}>{car.color}</Text>
                                </Text>
                                <Text style={styles.info}>
                                    مكان السيارة: <Text style={styles.highlight}>{car.location}</Text>
                                </Text>
                            </View>
                            <Image source={car.image} style={styles.carImage} />
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
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginVertical:10
                        }}>
                        <TouchableOpacity style={styles.callButton}>
                                <Text style={styles.callText}>
                                    عرض الصور 
                                </Text>
                                <Entypo name="images" size={20} color="#FFF" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.callButton}>
                                <Text style={styles.callText}>{'عرض الفيديو'}</Text>
                                <AntDesign name="videocamera" size={20} color="#FFF" />
                                </TouchableOpacity>


                            <TouchableOpacity style={styles.callButton}>
                                <Text style={styles.callText}>
                            باقي المواصفات
                                </Text>
                                <FontAwesome name="list-ul" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>


        </View>
    );
};
