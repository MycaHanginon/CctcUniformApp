import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation

const User = () => {
    const router = useRouter(); // Initialize router for navigation

    const handleEditProfile = () => {
        // Navigate to the EditProfile screen
        router.push('/edit-profile'); // Update this if your edit profile route is different
    };

    const handleLogout = () => {
        // Logic for logging out the user
        console.log('User logged out');
        // Navigate to the login screen directly
        router.push('/login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={require('../../assets/myca.jpg')} style={styles.profileImage} />
                <Text style={styles.userName}>Myca Hanginoon</Text>
                <Text style={styles.userEmail}>my@gmail.com</Text>
                <Text style={styles.userBio}>Coffee lover and aspiring developer.</Text>
            </View>

            {/* Edit Profile Button Container */}
            <View style={styles.editButtonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            {/* Logout Button Container */}
            <View style={styles.logoutButtonContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#a8cce6ff', // White background for the container
        alignItems: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#699bc4', // Light blue border
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#183246', // Dark blue for user name
    },
    userEmail: {
        fontSize: 16,
        color: '#294d6b', // Dark teal for email
        marginBottom: 5,
    },
    userBio: {
        fontSize: 14,
        color: '#777', // You can keep this or adjust as needed
        textAlign: 'center',
        marginBottom: 20,
    },
    editButtonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 15, // Adds space between edit and logout buttons
    },
    logoutButtonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#699bc4', // Light blue for edit button
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    logoutButton: {
        backgroundColor: '#294d6b', // Dark teal for logout button
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#ffffff', // White text for buttons
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default User;