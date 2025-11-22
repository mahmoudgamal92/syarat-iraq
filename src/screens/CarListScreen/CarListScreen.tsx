import React, { useEffect } from 'react';
import {
    View,
    FlatList,
    Linking,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { BaseLayout, Header, Loader, Tabber, ImageList, CarOptions, ActionButton, EmptyListComponent } from '@components';
import { useCars } from '@hooks';
import { ACTION, carFilters } from '@types';
import { CarItem } from '@components';
import { styles } from './styles';
import { SCREENS } from '@navigation';

export const CarListScreen = ({ route, navigation }) => {
    const { type, filters } = route?.params ?? {};
    const { loading, cars, getCarList } = useCars();
    const [carList, setCars] = React.useState([]);
    const [selectedTab, setSelectedTab] = React.useState<number | string>('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [images, setImages] = React.useState<string[]>([]);

    const [optionaVisible, setOptionsVisible] = React.useState(false);
    const [options, setOptions] = React.useState<string>('');

    useEffect(() => {
        setCars(cars);
    }, [cars]);


    useEffect
        (() => {
            const cleanedFilters = Object.fromEntries(
                Object.entries(filters || {}).filter(
                    ([, value]) =>
                        value !== null &&
                        value !== undefined &&
                        value !== "" &&
                        !(Array.isArray(value) && value.length === 0)
                )
            );
            getCarList(
                {
                    PageNumber: 1,
                    PageSize: 100,
                    PurchaseType: type == ACTION.BUY ? 1 : 2,
                    ...cleanedFilters

                }
            )
        }, []);


    const filterList = (tab) => {
        setSelectedTab(tab);
        if (!cars || cars.length === 0) return;
        let sorted = [...cars];

        if (tab === 1) {
            // أقل سعر
            sorted.sort((a, b) => a.carPrice - b.carPrice);
        } else if (tab === 2) {
            // أعلى سعر
            sorted.sort((a, b) => b.carPrice - a.carPrice);
        } else if (tab === 0) {
            // أقل كيلومترات
            sorted.sort((a, b) => a.carOdometer - b.carOdometer);
        }
        // update the SAME state used in FlatList
        setCars(sorted);
    };




    const openVideoUrl = async (url) => {
        if (!url || typeof url !== "string") {
            alert("الرابط غير صالح");
            return;
        }

        try {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                alert("لا يمكن فتح رابط الفيديو");
            }

        } catch (error) {
            alert("حدث خطأ أثناء محاولة فتح الرابط");
        }
    };




    return (
        <BaseLayout>
            <Header />
            {loading && <Loader visible={loading} />}
            <View style={{
                flex: 1,
                padding: 10,
                backgroundColor: '#FFF'
            }}>
                {type == ACTION.BUY &&
                    <Tabber data={carFilters} selected={selectedTab} onSelect={filterList} />
                }

                {type == ACTION.EXCHANGE &&
                    <ActionButton
                        title="اضغط هنا لعرض سيارتك للمراوس"
                        onPress={() => navigation.navigate(SCREENS.CARS.FORM, { type: ACTION.EXCHANGE })}
                        icon={<Entypo name="circle-with-plus" size={30} color="#FFF" />}
                    />

                }

                <ImageList
                    visible={modalVisible}
                    title="صور السياره"
                    images={images}
                    onClose={() => setModalVisible(false)}
                />

                <CarOptions visible={optionaVisible}
                    options={options}
                    onClose={() => setOptionsVisible(false)}
                />

                <FlatList
                    data={carList}
                    renderItem={({ item }) => (
                        <CarItem
                            key={item.id}
                            car={item}
                            onShowImages={(imageArray) => {
                                setImages(imageArray);
                                setModalVisible(true);
                            }}
                            onShowVideo={() => openVideoUrl(item.carDescription)}
                            onShowDetails={() => {
                                setOptions(item.moreDetails);
                                setOptionsVisible(true)
                            }}
                        />)}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<EmptyListComponent />}
                />

            </View>

        </BaseLayout>
    );
};
