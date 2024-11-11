import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');

  const router = useRouter(); // Initialize router for navigation

  const handleSignUp = () => {
    // Add sign-up logic here (e.g., form validation, API call)
    if (password === confirmPassword) {
      console.log("User signed up:", { firstName, lastName, email, password, location });
      // Navigate to the login page
      router.push('/login');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      


      {/* Email Address */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="username" 
        />
      </View>
      
   

      {/* Email Address */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Email Address" 
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

      

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 20, // Space between logo and title
  },
  title: {
    fontSize: 28,
    color: '#183246', // Dark blue for the title
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
    marginTop: 15,
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
});

export default SignUp;
