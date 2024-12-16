import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import { styles } from "../../Styles/ReviewStyles";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get('window');
const ACCENT_COLOR = '#FF2B85';

const ReviewPage = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
        } else {
          setUserProfile(profileData);
          if (profileData.avatar_url) {
            const { data } = supabase.storage
              .from("avatars")
              .getPublicUrl(profileData.avatar_url);
            setAvatarUrl(data.publicUrl);
          }
          console.log("User profile:", profileData);
        }
      }
    } catch (error) {
      console.error("Unexpected error in fetchUserProfile:", error);
    }
  };

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

  const handleSubmitReview = async () => {
    if (!review.trim()) {
      Alert.alert("Incomplete Review", "Please write your review before submitting.");
      return;
    }

    if (rating === 0) {
      Alert.alert("Rating Missing", "Please select a rating before submitting.");
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("User not authenticated");
      }

      let imageUrl = null;
      if (image) {
        const fileName = `${Date.now()}.jpg`;
        const filePath = `review/${session.user.id}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("review-images")
          .upload(filePath, image);

        if (uploadError) {
          console.error("Supabase upload error:", uploadError);
          Alert.alert("Upload Error", uploadError.message);
          return;
        }

        const { data: urlData } = supabase.storage
          .from("review-images")
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      }

      const { data, error } = await supabase.from("reviews").insert({
        user_id: session.user.id,
        review_text: review,
        image_url: imageUrl,
        rating: rating,
      });

      if (error) {
        throw error;
      }

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
    }
  };

  return (
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

            {userProfile && (
              <View style={styles.userInfo}>
                <Image
                  source={{ uri: avatarUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' }}
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
                  style={styles.pickImageButton}
                  onPress={pickImageFromGallery}
                >
                  <Ionicons name="images" size={24} color="white" />
                  <Text style={styles.pickImageText}>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.pickImageButton}
                  onPress={pickImageFromCamera}
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
                  >
                    <Ionicons name="close" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitReview}
              >
                <Text style={styles.submitButtonText}>Submit Review</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => router.replace("/MainPage")}
              >
                <Text style={styles.skipButtonText}>Skip Review</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ReviewPage;

