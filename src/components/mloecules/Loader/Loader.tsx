import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { styles } from './styles';

export const Loader = ({ visible = false, color = '#000' }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            statusBarTranslucent
        >
            <View style={styles.container}>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size={'large'} color={color} />
                </View>
            </View>
        </Modal>
    );
};
