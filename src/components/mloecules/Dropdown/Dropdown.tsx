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
    dropdownPosition?: 'auto' | 'top' | 'bottom';
}

export const Dropdown: React.FC<DropdownProps> = ({
    data,
    value,
    onChange,
    placeholder = '',
    labelField = 'label',
    valueField = 'value',
    dropdownPosition = 'auto',
}) => {
    return (
        <RNEDropdown
            dropdownPosition={dropdownPosition}
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
