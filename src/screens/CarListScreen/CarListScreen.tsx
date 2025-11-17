import React, { useEffect } from 'react';
import {
    View,
    FlatList,
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
    const [selectedTab, setSelectedTab] = React.useState<number | string>('');

    const [modalVisible, setModalVisible] = React.useState(false);
    const [images, setImages] = React.useState<string[]>([]);

    const [optionaVisible, setOptionsVisible] = React.useState(false);
    const [options, setOptions] = React.useState<string>('');

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
                    <Tabber data={carFilters} selected={selectedTab} onSelect={setSelectedTab} />
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
                    data={cars}
                    renderItem={({ item }) => (
                        <CarItem
                            key={item.id}
                            car={item}
                            onShowImages={(imageArray) => {
                                setImages(imageArray);
                                setModalVisible(true);
                            }}
                            onShowVideo={() => console.log("Show video for:", item.id)}
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
