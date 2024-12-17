import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import moment from 'moment';

const { width } = Dimensions.get('window');
const ACCENT_COLOR = '#FF2B85';

const ReviewsScreen = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { hotelId, hotelName } = params;

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFullText, setShowFullText] = useState({});

    const fetchReviews = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('hotel_id', hotelId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            setReviews(data || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching reviews:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [hotelId]);

    const toggleShowFullText = (reviewId) => {
        setShowFullText(prev => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }));
    };

    const renderStars = (rating) => {
        return (
            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                        key={star}
                        name={star <= rating ? "star" : "star-outline"}
                        size={16}
                        color={ACCENT_COLOR}
                        style={styles.starIcon}
                    />
                ))}
            </View>
        );
    };

    const renderReviewItem = ({ item }) => {
        const isLongText = item.review_text.length > 100;
        const displayText = showFullText[item.id] || !isLongText
            ? item.review_text
            : `${item.review_text.substring(0, 100)}...`;

        return (
            <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                    <Image
                        source={{
                            uri: item.user_avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                        }}
                        style={styles.avatar}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>
                            {item.user_name || 'Anonymous User'}
                        </Text>
                        <Text style={styles.date}>
                            {moment(item.created_at).format('MMM DD, YYYY')}
                        </Text>
                    </View>
                    {renderStars(item.rating)}
                </View>

                <View style={styles.reviewContent}>
                    <Text style={styles.reviewText}>
                        {displayText}
                    </Text>
                    {isLongText && (
                        <TouchableOpacity
                            onPress={() => toggleShowFullText(item.id)}
                            style={styles.readMoreButton}
                        >
                            <Text style={styles.readMoreText}>
                                {showFullText[item.id] ? 'Show less' : 'Read more'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                {item.image_url && (
                    <Image
                        source={{ uri: item.image_url }}
                        style={styles.reviewImage}
                        resizeMode="cover"
                    />
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {hotelName} Reviews
                </Text>
                <View style={styles.backButton} />
            </View>

            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={ACCENT_COLOR} />
                </View>
            ) : error ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>Error loading reviews: {error}</Text>
                </View>
            ) : reviews.length === 0 ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.noReviewsText}>No reviews yet</Text>
                </View>
            ) : (
                <FlatList
                    data={reviews}
                    renderItem={renderReviewItem}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    listContainer: {
        padding: 16,
    },
    reviewCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        marginLeft: 2,
    },
    reviewContent: {
        marginBottom: 12,
    },
    reviewText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#444',
    },
    readMoreButton: {
        marginTop: 8,
    },
    readMoreText: {
        color: ACCENT_COLOR,
        fontSize: 14,
        fontWeight: '500',
    },
    reviewImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginTop: 8,
    },
    errorText: {
        color: '#ff0000',
        fontSize: 16,
        textAlign: 'center',
    },
    noReviewsText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default ReviewsScreen;
