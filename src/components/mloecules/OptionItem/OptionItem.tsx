
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { styles } from './styles';


export const OptionItem = ({
  text,
  onPress,
  icon,
  selected,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.featureButton,
        selected && styles.featureButtonSelected,
      ]}
      onPress={onPress}
    >
      <MaterialIcons
        name={'car-repair'}
        size={30}
        color={selected ? '#FFF' : '#4A4A4A'} // Change icon color
      />
      <Text
        style={[
          styles.featureText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};