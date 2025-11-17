
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

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
      <AntDesign
        name={icon}
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