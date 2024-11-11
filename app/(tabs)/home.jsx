import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [caption, setCaption] = useState('');
    const [commentText, setCommentText] = useState('');

    const currentUser = {
        name: "Myca",
        profilePicture: require('../../assets/myca.jpg')
    };

    const niel = {
        name: "Niel",
        profilePicture: require('../../assets/niel.jpg') // Replace with actual image path
    };

    const leia = {
        name: "Leia",
        profilePicture: require('../../assets/leia.jpg') // Replace with actual image path
    };

    const addPost = () => {
        if (caption.trim().length > 0) {
            const newPost = { 
                id: Date.now().toString(), 
                text: caption, 
                comments: [
                    { text: "Can I purchase?", user: niel },
                    { text: "How much?", user: leia }
                ], // Pre-filling comments from Niel and Leia
                likes: 1000, 
                liked: false, 
                user: currentUser 
            };
            setPosts([newPost, ...posts]);
            setCaption('');
        } else {
            alert('Please enter a caption before posting.');
        }
    };

    const addComment = (postId) => {
        if (commentText.trim().length > 0) {
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return { 
                        ...post, 
                        comments: [...post.comments, { text: commentText, user: currentUser }] 
                    };
                }
                return post;
            }));
            setCommentText('');
        } else {
            alert('Please enter a comment.');
        }
    };

    const toggleLike = (postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return { 
                    ...post, 
                    liked: !post.liked,
                    likes: post.liked ? post.likes - 1 : post.likes + 1 
                };
            }
            return post;
        }));
    };

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <View style={styles.userInfo}>
                <Image source={item.user.profilePicture} style={styles.profilePicture} />
                <Text style={styles.userName}>{item.user.name}</Text>
            </View>
            <Text style={styles.postText}>{item.text}</Text>

            <View style={styles.likeCommentSection}>
                <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.likeButton}>
                    <FontAwesome 
                        name={item.liked ? 'heart' : 'heart-o'} 
                        size={20} 
                        color={item.liked ? '#d32f2f' : '#699bc4'}
                        style={styles.likeIcon}
                    />
                    <Text style={[styles.likeButtonText, item.liked && styles.liked]}>
                        {item.likes} {item.likes === 1 ? 'Like' : 'Likes'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.commentSection}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Write a comment..."
                    value={commentText}
                    onChangeText={setCommentText}
                    placeholderTextColor="#b2cce1"
                />
                <TouchableOpacity style={styles.commentButton} onPress={() => addComment(item.id)}>
                    <Text style={styles.commentButtonText}>Comment</Text>
                </TouchableOpacity>
            </View>

            {item.comments.length > 0 && (
                <View style={styles.commentsContainer}>
                    {item.comments.map((comment, index) => (
                        <View key={index} style={styles.commentContainer}>
                            <Image source={comment.user.profilePicture} style={styles.commentProfilePicture} />
                            <Text style={styles.commentText}>- {comment.user.name}: {comment.text}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="What's on your mind?"
                    value={caption}
                    onChangeText={setCaption}
                    placeholderTextColor="#b2cce1"
                />
                <TouchableOpacity style={styles.postButton} onPress={addPost}>
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </View>

            {posts.length === 0 ? (
                <View style={styles.emptyMessageContainer}>
                    <Text style={styles.emptyMessage}>No posts yet. Share your thoughts!</Text>
                </View>
            ) : (
                <FlatList
                    data={posts}
                    renderItem={renderPost}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.feed}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b2cce1',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 3,
    },
    textInput: {
        flex: 1,
        borderColor: '#294d6b',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#294d6b',
    },
    postButton: {
        backgroundColor: '#294d6b',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginLeft: 10,
        justifyContent: 'center',
    },
    postButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    feed: {
        paddingHorizontal: 10,
    },
    postContainer: {
        marginBottom: 15,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 15,
        elevation: 4,
        shadowColor: '#294d6b',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#183246',
    },
    postText: {
        fontSize: 16,
        color: '#294d6b',
        marginBottom: 10,
    },
    likeCommentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeIcon: {
        marginRight: 5,
    },
    likeButtonText: {
        color: '#699bc4',
        fontSize: 14,
    },
    liked: {
        color: '#d32f2f',
    },
    commentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    commentInput: {
        flex: 1,
        borderColor: '#294d6b',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#294d6b',
    },
    commentButton: {
        backgroundColor: '#183246',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginLeft: 5,
        justifyContent: 'center',
    },
    commentButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    commentsContainer: {
        marginTop: 10,
        paddingLeft: 10,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    commentProfilePicture: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    commentText: {
        fontSize: 14,
        color: '#294d6b',
    },
    emptyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyMessage: {
        fontSize: 18,
        color: '#294d6b',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default Home;