import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSend = () => {
        if (message.trim()) {
            // Add user message to chat history
            setChatHistory(prev => [...prev, { id: Date.now().toString(), text: message, sender: 'user' }]);
            // Clear input field
            setMessage('');
            // Respond based on the user's message
            respondToMessage(message);
        }
    };

    const respondToMessage = (userMessage) => {
        let responseText;

        // Determine response based on user message content
        if (userMessage.toLowerCase().includes("update") || userMessage.toLowerCase().includes("change")) {
            responseText = "Your order is being processed, and we can still make changes. Please let us know what you would like to modify.";
        } else if (userMessage.toLowerCase().includes("check") || userMessage.toLowerCase().includes("enjoy")) {
            responseText = "Just checking in to see how you’re enjoying your new purchase! If you have any questions, feel free to reach out.";
        } else {
            responseText = "Thank you for reaching out! How can we assist you further?";
        }

        // Add seller's response to chat history after a slight delay
        setTimeout(() => {
            setChatHistory(prev => [...prev, { id: Date.now().toString(), text: responseText, sender: 'seller' }]);
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Chat with Seller</Text>

            <FlatList
                data={chatHistory}
                renderItem={({ item }) => (
                    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.sellerMessage]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.chatList}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    placeholderTextColor="#b2cce1" // Placeholder color
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#a8cce6ff', // White background
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#183246', // Dark blue for the header
    },
    chatList: {
        paddingBottom: 10,
    },
    messageContainer: {
        borderRadius: 15,
        padding: 10,
        marginVertical: 5,
        maxWidth: '80%',
        elevation: 3,
    },
    userMessage: {
        backgroundColor: '#699bc4', // Light blue for user messages
        alignSelf: 'flex-end',
        borderBottomLeftRadius: 0,
    },
    sellerMessage: {
        backgroundColor: '#b2cce1', // Light greyish blue for seller messages
        alignSelf: 'flex-start',
        borderBottomRightRadius: 0,
    },
    messageText: {
        color: '#ffffff', // White text for messages
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#294d6b', // Dark teal for the input border
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        fontSize: 16,
        color: '#183246', // Dark blue for input text
    },
    sendButton: {
        backgroundColor: '#294d6b', // Dark teal for the send button
        padding: 10,
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#ffffff', // White text for send button
        fontWeight: 'bold',
    },
});

export default Chat;