import { StyleSheet, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
    const images = [
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800",
    ];

    return (
        <View style={styles.container}>
            <SliderBox
                images={images}
                autoPlay
                circleLoop
                dotColor="#13274f"
                inactiveDotColor="#90A4AE"
                ImageComponentStyle={styles.imageComponent}
            />
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 10,
        flex:1
    },
    imageComponent: {
        borderRadius: 15,
        width: "94%",
        height: 200, // Optional: Set a specific height for better control
        shadowColor: "#000", // Adding shadow for depth
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5, // For Android shadow
    },
});
