import React, { useEffect } from 'react';
import {
    View,
    FlatList,
} from 'react-native';
import { BaseLayout, Header, Loader, Tabber, ImageList, CarOptions, VechileItem, EmptyListComponent } from '@components';
import { useMechanism } from '@hooks';
import { ACTION, carFilters } from '@types';

export const VechileListScreen = ({ route, navigation }) => {
    const { type, filters } = route?.params ?? {};
    console.log('filters', filters)
    const { loading, mechanisms, getMechanismList } = useMechanism();
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
            getMechanismList(
                {
                    PageNumber: 1,
                    PageSize: 100,
                }
            )
        }, []);

    return (
        <BaseLayout>
            <Header />
            {loading && <Loader visible={loading} />}
            <View style={{
                flex: 1,
                backgroundColor: '#FFF',
                justifyContent: 'center',
                alignContent: 'center'
            }}>
                {type == ACTION.BUY &&
                    <Tabber data={carFilters} selected={selectedTab} onSelect={setSelectedTab} />
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
                    data={mechanisms}
                    renderItem={({ item }) => (
                        <VechileItem
                            key={item.id}
                            vechile={item}
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
                    ListEmptyComponent={<EmptyListComponent type='mechanism' />}
                />

            </View>

        </BaseLayout>
    );
};
