import React, { useState, useCallback } from "react";
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
  ScrollView 
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../Styles/ReviewStyles";
import { Ionicons } from "@expo/vector-icons";

const ReviewPage = () => {
    const [review, setReview] = useState("");
    const [image, setImage] = useState(null);
    const router = useRouter();

    // Request permission to pick images from gallery
    const requestGalleryPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission Required", 
                "Please grant access to your photo library to select images.",
                [{ text: "OK" }]
            );
            return false;
        }
        return true;
    };

    // Request permission to use camera
    const requestCameraPermission = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission Required", 
                "Please grant camera access to take photos.",
                [{ text: "OK" }]
            );
            return false;
        }
        return true;
    };

    // Pick image from gallery
    const pickImageFromGallery = useCallback(async () => {
        const hasPermission = await requestGalleryPermission();
        if (!hasPermission) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
            aspect: [4, 3]
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }, []);

    // Take photo with camera
    const pickImageFromCamera = useCallback(async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) return;

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8,
            aspect: [4, 3]
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }, []);

    // Remove selected image
    const removeImage = () => {
        setImage(null);
    };

    // Submit review
    const handleSubmitReview = () => {
        if (!review.trim()) {
            Alert.alert(
                "Incomplete Review", 
                "Please write your review before submitting.",
                [{ text: "OK" }]
            );
            return;
        }

        // Here you would typically send the review to your backend
        Alert.alert(
            "Review Submitted", 
            "Thank you for your feedback!",
            [{ text: "OK", onPress: () => router.replace("/MainPage") }]
        );

        console.log("Review:", review);
        console.log("Image URI:", image);
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
                        
                        {/* Review Input */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Write your detailed feedback here..."
                            placeholderTextColor="#888"
                            multiline
                            numberOfLines={6}
                            value={review}
                            onChangeText={setReview}
                        />

                        {/* Image Picker Section */}
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

                            {/* Selected Image Preview */}
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

                        {/* Action Buttons */}
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