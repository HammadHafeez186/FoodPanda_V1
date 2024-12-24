import React, { useState, useCallback, useEffect } from "react";
import { Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import { styles } from "../../Styles/ReviewStyles";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import UserProfileFetcher from "../../components/userProfileFetcher";
import { useSelector, useDispatch } from 'react-redux';
import { resetCart } from "../../redux/CartReducer";

const { width, height } = Dimensions.get('window');
const ACCENT_COLOR = '#FF2B85';

const ReviewPage = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [reviewAvatar, setReviewAvatar] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const currentHotelId = useSelector((state) => state.cart.currentHotelId);

  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating);
  };

  const pickImageFromGallery = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Please grant access to your photo library to select images.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }, []);

  const pickImageFromCamera = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Please grant camera access to take photos.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }, []);

  const removeImage = () => {
    setImage(null);
  };

  const uploadImageToSupabase = async (uri, userId) => {
    try {
      const fileName = `${Date.now()}.jpg`;
      const filePath = `review/${userId}/${fileName}`;

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        name: fileName,
        type: 'image/jpeg'
      });

      const { data: { session } } = await supabase.auth.getSession();
      const supabaseUrl = supabase.storage.url;
      const storageUrl = `${supabaseUrl}/object/review-images/${filePath}`;

      const uploadResponse = await fetch(storageUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'x-upsert': 'true'
        },
        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status ${uploadResponse.status}`);
      }

      const { data: urlData } = supabase.storage
        .from("review-images")
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmitReview = async (userProfile) => {
    if (!review.trim()) {
      Alert.alert("Incomplete Review", "Please write your review before submitting.");
      return;
    }

    if (rating === 0) {
      Alert.alert("Rating Missing", "Please select a rating before submitting.");
      return;
    }

    setIsUploading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("User not authenticated");
      }

      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImageToSupabase(image, session.user.id);
        
        if (!imageUrl) {
          throw new Error("Failed to get image URL after upload");
        }
      }

      const { data, error } = await supabase.from("reviews").insert({
        user_id: session.user.id,
        review_text: review,
        image_url: imageUrl,
        rating: rating,
        hotel_id: currentHotelId,
        user_name: userProfile.username || userProfile.full_name,
        user_avatar: reviewAvatar
      });

      if (error) {
        throw error;
      }

      dispatch(resetCart());

      Alert.alert(
        "Review Submitted",
        "Thank you for your feedback!",
        [{ text: "OK", onPress: () => router.replace("/MainPage") }]
      );
    } catch (error) {
      console.error("Error submitting review:", error);
      Alert.alert(
        "Error",
        "There was a problem submitting your review. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkipReview = () => {
    dispatch(resetCart());
    router.replace("/MainPage");
  };

  const handleProfileLoaded = useCallback((profileData) => {
    if (profileData.avatar_url) {
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(profileData.avatar_url);
      setReviewAvatar(data.publicUrl);
    }
  }, []);

  return (
    <UserProfileFetcher
      onError={(error) => {
        console.error("Profile fetch error:", error);
        Alert.alert("Error", "Could not load user profile");
      }}
      onProfileLoaded={handleProfileLoaded}
    >
      {({ userProfile, avatarUrl, isLoading }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Share Your Experience</Text>

                {!isLoading && userProfile && (
                  <View style={styles.userInfo}>
                    <Image
                      source={{
                        uri: avatarUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                      }}
                      style={styles.avatar}
                    />
                    <Text style={styles.username}>
                      {userProfile.username || userProfile.full_name}
                    </Text>
                  </View>
                )}

                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => handleRatingSelect(star)}
                      style={styles.starButton}
                    >
                      <Ionicons
                        name={star <= rating ? "star" : "star-outline"}
                        size={30}
                        color={ACCENT_COLOR}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                <TextInput
                  style={styles.textInput}
                  placeholder="Write your detailed feedback here..."
                  placeholderTextColor="#888"
                  multiline
                  numberOfLines={6}
                  value={review}
                  onChangeText={setReview}
                  maxLength={500}
                />

                <View style={styles.imageSection}>
                  <View style={styles.imagePickerOptions}>
                    <TouchableOpacity
                      style={[styles.pickImageButton, isUploading && styles.disabledButton]}
                      onPress={pickImageFromGallery}
                      disabled={isUploading}
                    >
                      <Ionicons name="images" size={24} color="white" />
                      <Text style={styles.pickImageText}>Gallery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.pickImageButton, isUploading && styles.disabledButton]}
                      onPress={pickImageFromCamera}
                      disabled={isUploading}
                    >
                      <Ionicons name="camera" size={24} color="white" />
                      <Text style={styles.pickImageText}>Camera</Text>
                    </TouchableOpacity>
                  </View>

                  {image && (
                    <View style={styles.imagePreviewContainer}>
                      <Image
                        source={{ uri: image }}
                        style={styles.imagePreview}
                      />
                      <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={removeImage}
                        disabled={isUploading}
                      >
                        <Ionicons name="close" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.submitButton, isUploading && styles.disabledButton]}
                    onPress={() => handleSubmitReview(userProfile)}
                    disabled={isUploading}
                  >
                    <Text style={styles.submitButtonText}>
                      {isUploading ? "Uploading..." : "Submit Review"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.skipButton, isUploading && styles.disabledButton]}
                    onPress={handleSkipReview}
                    disabled={isUploading}
                  >
                    <Text style={styles.skipButtonText}>Skip Review</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </UserProfileFetcher>
  );
};

export default ReviewPage;

