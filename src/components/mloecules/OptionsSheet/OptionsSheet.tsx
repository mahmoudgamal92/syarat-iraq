import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
  onChange?: (selected: Array<{ id: number; name: string }>) => void;
};
export const OptionsSheet = forwardRef<OptionsSheetRef, OptionsSheetProps>(
  ({ data, onChange }, ref) => {
    const optionsSheetRef = useRef<BottomSheetRef>(null);
    const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);

    useImperativeHandle(ref, () => ({
      open: () => optionsSheetRef.current?.open(),
      close: () => optionsSheetRef.current?.close(),
    }));


    const handlePress = (id: number) => {
      setSelectedFeatures((prev) => {
        const updatedIds = prev.includes(id)
          ? prev.filter((featureId) => featureId !== id)
          : [...prev, id];

        const selectedObjects = data.filter((item) =>
          updatedIds.includes(item.id)
        );

        onChange?.(selectedObjects); // <-- Send ID + name to parent

        return updatedIds;
      });
    };


    const renderFeature = ({ item }) => (
      <OptionItem
        text={item.name}
        onPress={() => handlePress(item.id)}
        icon={'car'}
        selected={selectedFeatures.includes(item.id)}
      />
    );

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

        <View>
          <TouchableOpacity
            style={styles.Button} onPress={() => optionsSheetRef.current?.close()}>
            <Text style={styles.ButtonText}>
              تآكيد
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    );
  }
);
