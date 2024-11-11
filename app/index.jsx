import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image } from 'react-native';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons'; // For checkmark icon

export default function App() {
    const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in animation
    const [buttonAnim] = useState(new Animated.Value(1)); // For button press animation

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500, // Duration for fade-in
            useNativeDriver: true,
        }).start();
    }, []);

    // Button press animation
    const handlePressIn = () => {
        Animated.spring(buttonAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(buttonAnim, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {/* Logo */}
            <Image source={require('../assets/logo.png')} style={styles.logo} />

            {/* Title and Subtitle */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>CCTC</Text>
                <Text style={styles.subtitle}>College Uniform</Text>
            </View>

            {/* Animated Button */}
            <Animated.View style={{ transform: [{ scale: buttonAnim }] }}>
                <TouchableOpacity
                    style={styles.button}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <Link href="/login" style={styles.buttonText}>Login</Link>
                </TouchableOpacity>
            </Animated.View>

            <StatusBar style="light" />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a8cce6ff', // Light blue background
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 20,
        backgroundColor: '#a8cce6ff',
        padding: 10,
    },
    titleContainer: {
        alignItems: 'center',
       
    },
    title: {
        color: '#183246', // Dark blue for title
        fontSize: 24, // Title size
        fontFamily: 'Poppins-SemiBold', // Font for title
        textAlign: 'center',
     
    },
    subtitle: {
        color: '#183246', // Dark blue for subtitle
        fontSize: 24, // Subtitle size
        fontFamily: 'Poppins-Bold', // Font for subtitle
        textAlign: 'center',
        marginTop: 5, // Space between title and subtitle
    },
    button: {
        backgroundColor: '#283d71ff', // Button color
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        shadowColor: '#294d6b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },
    buttonText: {
        color: '#ffffff', // Button text color
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});