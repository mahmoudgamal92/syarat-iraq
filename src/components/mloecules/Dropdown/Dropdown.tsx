import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Dropdown as RNEDropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface DropdownProps {
    searchable?: boolean;
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
    style,
    placeholder = '',
    labelField = 'label',
    valueField = 'value',
    dropdownPosition = 'auto',
    searchable = false,
}) => {
    return (
        <RNEDropdown
            search={searchable}
            searchPlaceholder='يمكنك البحث هنا'
            searchField={labelField}
            dropdownPosition={dropdownPosition}
            style={style ? style : styles.dropdown}
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
