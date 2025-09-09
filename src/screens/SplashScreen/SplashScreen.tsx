import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import LottieView from 'lottie-react-native';
import { BaseLayout } from '@components';

export const SplashScreen = ({ navigation }) => {
    const animation = useRef<LottieView>(null);

    // Header animation
    const headerTranslateY = useSharedValue(-150);
    const headerOpacity = useSharedValue(0);

    useEffect(() => {
        // Animate header
        headerTranslateY.value = withTiming(0, { duration: 1200, easing: Easing.out(Easing.exp) });
        headerOpacity.value = withTiming(1, { duration: 1200 });

        // Navigate after 3 seconds
        const timer = setTimeout(() => {
            navigation.navigate('BottomTabs');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const headerStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: headerTranslateY.value }],
        opacity: headerOpacity.value,
    }));

    return (
        <BaseLayout>
            <View style={styles.container}>
                {/* Animated Header */}
                <Animated.Text style={[styles.header, headerStyle]}>
                    هلا فيك بتطبيق سيارات العراق 🚀
                </Animated.Text>

                {/* Lottie Animation */}
                <LottieView
                    ref={animation}
                    autoPlay
                    loop
                    style={{ width: 300, height: 300 }}
                    source={require('./../../assets/lottie/vehicle.json')}
                />

                {/* Bottom half-circle gradient */}
                <View style={StyleSheet.absoluteFill}>
                    <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <Defs>
                            <SvgGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                <Stop offset="0" stopColor="#5C4CF2" stopOpacity="1" />
                                <Stop offset="1" stopColor="#F28C5C" stopOpacity="1" />
                            </SvgGradient>
                        </Defs>
                        <Path
                            d="
                                M0,100
                                L0,70
                                C25,60 75,95 100,70
                                L100,100
                                Z
                            "
                            fill="url(#grad)"
                        />
                    </Svg>

                    {/* Bottom text */}
                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.bottomText}>اكتشف سياراتك المفضلة الآن!</Text>
                    </View>
                </View>
            </View>
        </BaseLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 22,
        fontFamily: 'Bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    bottomTextContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    bottomText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Bold',
        textAlign: 'center',
    },
});
