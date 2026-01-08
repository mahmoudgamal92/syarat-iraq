import React, { useEffect, useRef } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { BaseLayout, Header, Loader, ImageList, EmptyListComponent, ActionButton, CarItem, CarDetailsModal } from '@components';
import { useCars } from '@hooks';
import { ACTION, carFilters } from '@types';
import { openUrl } from '@utils';
import { SCREENS } from '@navigation';
import { FiltersSheet, FiltersSheetRef } from '@components';

export const InstallmentListScreen = ({ route, navigation }) => {
    const filtersRef = useRef<FiltersSheetRef>(null);

    const { type, filters } = route?.params ?? {};
    const { loading, cars, getCarList, getBrands, getModels } = useCars();
    const [carList, setCarList] = React.useState<any[]>([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [images, setImages] = React.useState<string[]>([]);

    const [carVisible, setCarVisible] = React.useState(false);
    const [selectedCar, setSelectedCar] = React.useState<any>(null);

    useEffect(() => {
        getBrands();
        getCarList(
            {
                PageNumber: 1,
                PageSize: 1000,
                PurchaseType: 3,
            }
        )
    }, []);


    useEffect(() => {
        if (cars?.carRequests) {
            setCarList(cars.carRequests);
        }
    }, [cars]);

    useEffect
        (() => {
            getCarList(
                {
                    PageNumber: 1,
                    PageSize: 100,
                    PurchaseType: type == ACTION.BUY ? 1 : 2,

                }
            )
        }, []);


    return (
        <BaseLayout>
            <Header />
            {loading && <Loader visible={loading} />}
            <View style={{
                flex: 1,
                padding: 10,
                backgroundColor: '#FFF'
            }}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 10,
                }}>
                    <TouchableOpacity
                        onPress={() => filtersRef.current?.open()}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: "#7B1FA2",
                            width: 55,
                            height: 55,
                            borderRadius: 50,
                            justifyContent: 'center',
                            borderWidth: 3,
                            borderColor: '#000'
                        }}>
                        <FontAwesome name="filter" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <ActionButton
                        title="اضغط هنا لاضافه سيازتك بالتقسيط  "
                        onPress={() => navigation.navigate(SCREENS.INSTALLMENT.FORM)}
                        icon={<Entypo name="circle-with-plus" size={30} color="#FFF" />}
                        containerStyle={{ width: '85%', height: 55, borderRadius: 30 }}
                        textStyle={{ fontSize: 12 }}
                    />

                </View>


                <ImageList
                    visible={modalVisible}
                    title="صور السياره"
                    images={images}
                    onClose={() => setModalVisible(false)}
                />

                <CarDetailsModal
                    visible={carVisible}
                    car={selectedCar}
                    onClose={() => setCarVisible(false)}
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
                            onShowDetails={() => {
                                setSelectedCar(item);
                                setCarVisible(true)
                            }}
                            onShowVideo={() => openUrl(item.mechanismDescription)}
                        />)}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<EmptyListComponent />}
                />
            </View>
            {/* setCarList(cars) */}
            <FiltersSheet ref={filtersRef} onApply={(cars) => {
                setCarList(cars);
                filtersRef.current?.close();
            }
            } />
        </BaseLayout>
    );
};