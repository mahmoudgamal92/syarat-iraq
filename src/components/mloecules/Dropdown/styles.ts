import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({

    containerStyle: {

    },
    dropdown: {
        flex: 1,
        backgroundColor: '#FFFF',
        color: '#FFF',
        borderRadius: 8,
        padding: 10,
        textAlign: 'right',
        borderColor: 'gray',
        marginHorizontal: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        fontSize: 14,
    },
    placeholderStyle: {
        textAlign: 'right',
        fontFamily: 'Regular',
        fontSize: 16,
        color: '#000',
    },
    selectedTextStyle: {
        fontFamily: 'Regular',
        fontSize: 16,
        textAlign: 'right',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        fontFamily: 'Regular',
        height: 40,
        fontSize: 16,
    },
});