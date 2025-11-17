import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface EmptyListComponentProps {
    title?: string;
    description?: string;
    buttonText?: string;
    onPressButton?: () => void;
    type?: string;
}

export const EmptyListComponent: React.FC<EmptyListComponentProps> = ({
    title = 'لا توجد بيانات',
    description = 'لم يتم العثور على أي عناصر لعرضها حالياً.',
    buttonText,
    onPressButton,
    type = 'car'
}) => {
    return (

        <View style={styles.container}>
            <Image
                source={type === 'car' ? require('@/assets/images/car_placeholder.png') : require('@/assets/images/excavator.png')}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>

            {onPressButton && (
                <TouchableOpacity onPress={onPressButton} style={styles.button}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
        opacity: 0.8,
    },
    title: {
        fontFamily: 'Bold',
        fontSize: 18,
        fontWeight: '600',
        color: '#4A148C',
        textAlign: 'center',
        marginBottom: 6,
    },
    description: {
        fontFamily: 'Regular',
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#4A148C',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
});
