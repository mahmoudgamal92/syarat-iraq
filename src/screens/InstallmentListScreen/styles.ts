import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export const styles = StyleSheet.create({
    container: {
    },
    row: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dropdown: {
        flex: 1,
        backgroundColor: '#DDDDDD',
        color: '#FFF',
        borderRadius: 8,
        padding: 10,
        textAlign: 'right',
        borderColor: 'gray',
        marginHorizontal: 5,
    }
});
