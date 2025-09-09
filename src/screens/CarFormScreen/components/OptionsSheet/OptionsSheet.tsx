import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Button, FlatList, TouchableOpacity } from 'react-native';
import { BottomSheet, BottomSheetRef } from '@components';
import { styles } from './styles';
import { OptionItem } from '@components';
import { useCars } from '@hooks';

export type OptionsSheetRef = {
  open: () => void;
  close: () => void;
};

type OptionsSheetProps = {
  data: Array<{ id: number; name: string }>;
};

export const OptionsSheet = forwardRef<OptionsSheetRef, OptionsSheetProps>(({ data }, ref) => {
  const { carDetails } = useCars();

  const optionsSheetRef = useRef<BottomSheetRef>(null);

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useImperativeHandle(ref, () => ({
    open: () => optionsSheetRef.current?.open(),
    close: () => {
      optionsSheetRef.current?.close();
    },
  }));

  const handlePress = (id: number) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((featureId) => featureId !== id) : [...prev, id]
    );
  };

  const renderFeature = ({ item }) => {
    return (
      <OptionItem text={item.name} onPress={() => handlePress(item.id)} icon={'car'} selected={selectedFeatures.includes(item.id)} />
    );
  };

  return (
    <BottomSheet ref={optionsSheetRef} title="مميزات السياره">
      <View style={styles.formContainer}>
        <FlatList
          data={data}
          renderItem={renderFeature}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.featureGrid}
        />
      </View>
    </BottomSheet>
  );
});