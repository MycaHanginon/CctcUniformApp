import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter(); // Initialize router for navigation

  const handleLogin = () => {
    // Add login logic here (e.g., form validation, API call)
    console.log("User logged in:", { email, password });
    // Navigate to the home page after login
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Title and Subtitle */}
      <Text style={styles.title}>CCTC</Text>
      <Text style={styles.subtitle}>College uniform</Text>



      {/* Email Address */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
    
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => console.log("Navigate to forgot password")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.signUp}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#a8cce6ff',
  },
  logo: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
  
  },
  title: {
    fontSize: 24, // Adjust size for title
    color: '#183246', // Dark blue for the title
    fontFamily: 'Poppins-SemiBold', // Use bold font from your font family
   
  },
  subtitle: {
    fontSize: 24, // Adjust size for subtitle
    color: '#183246', // Light blue for subtitle
    fontFamily: 'Poppins-Bold', // Use regular font from your font family
    marginBottom: 30, // Space between subtitle and login text
  },
  loginText: {
    fontSize: 28,
    color: '#183246', // Dark blue for the login text
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#ffffff', // White background for inputs
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#699bc4', // Light blue for labels
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#b2cce1', // Light blue for input borders
    borderRadius: 5,
    backgroundColor: '#ffffff', // White background for inputs
  },
  button: {
    marginTop: 20,
    backgroundColor: '#294d6b', // Dark teal for button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff', // White text for button
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPassword: {
    marginTop: 15,
    color: '#699bc4', // Light blue for forgot password text
    textDecorationLine: 'underline',
  },
  signUp: {
    marginTop: 10,
    color: '#699bc4', // Light blue for sign up link
    textDecorationLine: 'underline',
  },
});

export default Login;
