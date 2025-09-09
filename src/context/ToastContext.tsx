import React, { createContext, useContext, useState, ReactNode } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextProps {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

let idCounter = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: ToastType = 'info') => {
        const id = idCounter++;
        setToasts((prev) => [...prev, { id, message, type }]);

        // Remove toast after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <View style={styles.container} pointerEvents="box-none">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} />
                ))}
            </View>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

// Toast item component
const ToastItem = ({ toast }: { toast: Toast }) => {
    const translateY = new Animated.Value(50);

    React.useEffect(() => {
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
    }, []);

    const backgroundColor =
        toast.type === 'success' ? '#4CAF50' : toast.type === 'error' ? '#F44336' : '#2196F3';

    return (
        <Animated.View style={[styles.toast, { backgroundColor, transform: [{ translateY }] }]}>
            {toast.type === 'error' &&
                <Feather name="alert-octagon" size={24} color="#FFF" />
            }

            {toast.type === 'success' &&
                <AntDesign name="checksquareo" size={24} color="#FFF" />
            }

            {toast.type === 'info' &&
                <AntDesign name="infocirlceo" size={24} color="#FFF" />}
            <Text style={styles.text}>{toast.message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        width: '100%',
        alignItems: 'center',
    },
    toast: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    text: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Regular'
    },
});
