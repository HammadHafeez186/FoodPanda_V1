import { Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../Styles/ReviewStyles";

const ReviewPage = () => {
    const [review, setReview] = useState("");
    const [image, setImage] = useState(null);  // For storing the selected image
    const router = useRouter();

    // Request permission to pick images
    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "We need permission to access your photos.");
        }
    };

    // Function to open image picker from the gallery
    const pickImageFromGallery = async () => {
        await requestPermission();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);  // Set the image URI to state
        }
    };

    // Function to open the camera
    const pickImageFromCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "We need permission to access your camera.");
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);  // Set the image URI to state
        }
    };

    // Handle submitting review
    const handleSubmitReview = () => {
        if (!review.trim()) {
            Alert.alert("Review Required", "Please add a review before submitting.");
            return;
        }

        Alert.alert("Thank You!", "Your review has been submitted.", [
            { text: "OK", onPress: () => router.replace("/MainPage") },
        ]);

        console.log("Review:", review);
        console.log("Image URI:", image);
    };

    // Navigate directly to the MainPage if user doesn't want to add a review
    const handleSkipReview = () => {
        router.replace("/MainPage");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Add a Review</Text>
            
            {/* Review Input */}
            <TextInput
                style={styles.textInput}
                placeholder="Share your feedback here..."
                multiline
                value={review}
                onChangeText={(text) => setReview(text)}
            />

            {/* Image Picker Options */}
            <View style={styles.imagePickerOptions}>
                <TouchableOpacity
                    style={styles.pickImageButton}
                    onPress={pickImageFromGallery}
                >
                    <Text style={styles.pickImageText}>Pick from Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.pickImageButton}
                    onPress={pickImageFromCamera}
                >
                    <Text style={styles.pickImageText}>Use Camera</Text>
                </TouchableOpacity>
            </View>

            {/* Display Selected Image */}
            {image && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity 
                style={styles.submitButton} 
                onPress={handleSubmitReview}
            >
                <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>

            {/* Skip Review Button */}
            <TouchableOpacity 
                style={styles.skipButton}
                onPress={handleSkipReview}
            >
                <Text style={styles.skipButtonText}>Skip Review</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ReviewPage;
