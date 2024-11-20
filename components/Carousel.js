import { View, FlatList, Image, Dimensions } from "react-native";
import React, { useState, useRef } from "react";
import CarouselStyles from '../Styles/CarouselStyles';

const Carousel = () => {
    const images = [
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800",
    ];

    const { width } = Dimensions.get("window");

    const [currentIndex, setCurrentIndex] = useState(0);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <View style={CarouselStyles.container}>
            <FlatList
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                renderItem={({ item }) => (
                    <View style={[CarouselStyles.imageWrapper, { width }]}>
                        <Image source={{ uri: item }} style={CarouselStyles.image} />
                    </View>
                )}
            />
            <View style={CarouselStyles.dotContainer}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            CarouselStyles.dot,
                            currentIndex === index && CarouselStyles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

export default Carousel;
