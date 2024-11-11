import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Uniform = () => {
    const navigation = useNavigation();
    const [category, setCategory] = useState('male');
    const [size, setSize] = useState('small');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedUniformId, setSelectedUniformId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState('');

    const maleUniforms = [
        { id: '1', name: 'Upper Uniform for College', price: 30, rating: 4.5, stock: 10, image: require('../../assets/male.png') },
        { id: '2', name: 'Lower Uniform for College', price: 40, rating: 4.0, stock: 5, image: require('../../assets/male.png') },
    ];

    const femaleUniforms = [
        { id: '1', name: 'Upper Uniform for College', price: 35, rating: 4.7, stock: 8, image: require('../../assets/female1.png') },
        { id: '2', name: 'Lower Uniform for College', price: 45, rating: 4.2, stock: 3, image: require('../../assets/female1.png') },
    ];

    const uniforms = category === 'male' ? maleUniforms : femaleUniforms;

    const calculateTotalPrice = () => {
        const selectedUniform = uniforms.find(uniform => uniform.id === selectedUniformId);
        if (selectedUniform) {
            const total = selectedUniform.price * quantity;
            setTotalPrice(total);
        }
    };

    const handleOrder = () => {
        const estimatedDate = new Date();
        estimatedDate.setDate(estimatedDate.getDate() + 5);
        const formattedDate = `${estimatedDate.toLocaleDateString()} ${estimatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        
        setDeliveryDate(formattedDate);
        setModalVisible(true);
        setQuantity(1);
        setTotalPrice(0);
        setSelectedUniformId(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Uniform Shopping</Text>

            <View style={styles.categoryContainer}>
                {['male', 'female'].map((item) => (
                    <TouchableOpacity 
                        key={item}
                        onPress={() => setCategory(item)} 
                        style={[styles.categoryButton, category === item && styles.selectedCategory]}
                    >
                        <Text style={styles.categoryText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={uniforms}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => {
                            setSelectedUniformId(item.id);
                            calculateTotalPrice();
                        }} 
                        style={styles.uniformCard}
                    >
                        <Image source={item.image} style={styles.uniformImage} />
                        <View style={styles.uniformInfo}>
                            <Text style={styles.uniformName}>{item.name}</Text>
                            <Text style={styles.uniformPrice}>${item.price}</Text>
                            <Text style={styles.uniformRating}>Rating: {item.rating} ★</Text>
                            <Text style={styles.uniformStock}>{item.stock} available</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.uniformList}
            />

            <View style={styles.sizeContainer}>
                <Text style={styles.sizeLabel}>Size:</Text>
                {['small', 'medium', 'large'].map((sizeOption) => (
                    <TouchableOpacity 
                        key={sizeOption} 
                        onPress={() => setSize(sizeOption)} 
                        style={[styles.sizeButton, size === sizeOption && styles.selectedSize]}
                    >
                        <Text style={styles.sizeText}>{sizeOption.charAt(0).toUpperCase() + sizeOption.slice(1)}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.orderContainer}>
                <Text style={styles.quantityLabel}>Quantity:</Text>
                <TextInput 
                    style={styles.quantityInput} 
                    value={String(quantity)} 
                    onChangeText={text => setQuantity(Number(text))} 
                    keyboardType="numeric" 
                />
                <Text style={styles.totalPrice}>Total: ${totalPrice}</Text>
            </View>

            <TouchableOpacity onPress={handleOrder} style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Place Order</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Order Placed!</Text>
                        <Text style={styles.modalMessage}>Your order was successful!</Text>
                        <Text style={styles.modalDeliveryText}>Estimated Delivery: {deliveryDate}</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#a8cce6ff', // Soft background color
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#183246', // Darker shade
        textAlign: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    categoryButton: {
        padding: 10,
        backgroundColor: '#699bc4', // Blue shade
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        width:'45%',
       
    },
    selectedCategory: {
        backgroundColor: '#294d6b', // Darker shade for selected
    },
    categoryText: {
        fontSize: 16,
        color: '#ffffff', // White text for contrast
    },
    uniformList: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    uniformCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#ffffff', // Uniform card background
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#4a90e2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    uniformImage: {
        width: 80,
        height: 80,
        marginRight: 15,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#699bc4', // Blue border for images
    },
    uniformInfo: {
        flex: 1,
    },
    uniformName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#183246', // Darker shade
    },
    uniformPrice: {
        fontSize: 16,
        color: '#699bc4', // Blue price text
    },
    uniformRating: {
        fontSize: 14,
        color: '#FFD700', // Gold for rating
    },
    uniformStock: {
        fontSize: 14,
        color: '#888',
    },
    sizeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    sizeLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#183246', // Darker shade
    },
    sizeButton: {
        padding: 6,
        backgroundColor: '#b2cce1', // Light blue
        borderRadius: 10,
        shadowColor: '#1b3c5b',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    selectedSize: {
        backgroundColor: '#699bc4', // Blue for selected
    },
    sizeText: {
        fontSize: 16,
        color: '#183246', // Darker shade
    },
    orderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    quantityLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#183246', // Darker shade
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#699bc4', // Blue border
        borderRadius: 8,
        padding: 5,
        width: '30%',
        textAlign: 'center',
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#183246', // Darker shade
    },
    orderButton: {
        padding: 7,
        backgroundColor: '#567c8d', // Green shade
        borderRadius: 5,
        alignItems: 'center',
    },
    orderButtonText: {
        fontSize: 18,
        color: '#ffffff', // White text
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#f5efeb', // Modal background color
        borderRadius: 12,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#183246', // Darker shade
    },
    modalMessage: {
        fontSize: 16,
        color: '#183246', // Darker shade
        marginVertical: 10,
    },
    modalDeliveryText: {
        fontSize: 16,
        color: '#699bc4', // Blue text
        marginBottom: 20,
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#567c8d', // Green shade
        borderRadius: 8,
    },
    modalButtonText: {
        color: '#ffffff', // White text
    },
});

export default Uniform;
