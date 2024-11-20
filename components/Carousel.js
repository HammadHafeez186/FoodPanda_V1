import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import React, { useState } from "react";

const Carousel = () => {
    const images = [
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800",
    ];

    const { width } = Dimensions.get("window");

    const [currentIndex, setCurrentIndex] = useState(0);

    const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                renderItem={({ item }) => (
                    <View style={[styles.imageWrapper, { width }]}>
                        <Image source={{ uri: item }} style={styles.image} />
                    </View>
                )}
            />
            <View style={styles.dotContainer}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    imageWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        borderRadius: 15,
        width: "94%",
        height: 200,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    dotContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#90A4AE",
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: "#13274f",
    },
});
