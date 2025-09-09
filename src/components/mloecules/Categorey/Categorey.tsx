
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {styles} from './styles';


export const Categorey = ({
text, 
onPress,
icon,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
    <Image
    source={icon} 
    style={styles.buttonIcon}
    />
    <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};