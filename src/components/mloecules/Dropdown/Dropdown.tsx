import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Dropdown as RNEDropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface DropdownProps {
    data: any[];
    value: string | number;
    onChange: (item: any) => void;
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    placeholderStyle?: StyleProp<TextStyle>;
    labelField?: string;
    valueField?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
    data,
    value,
    onChange,
    placeholder = '',
    containerStyle,
    style,
    placeholderStyle,
    labelField = 'label',
    valueField = 'value',
}) => {
    return (
        <RNEDropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            containerStyle={styles.containerStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            labelField={labelField}
            valueField={valueField}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            renderLeftIcon={() => (
                <Ionicons
                    name="chevron-down"
                    size={20}
                    color="#000"
                    style={{ transform: [{ scaleX: -1 }] }}
                />
            )}
            renderRightIcon={() => null}
        />
    );
};
