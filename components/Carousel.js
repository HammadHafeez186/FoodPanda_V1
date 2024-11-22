import { View, FlatList, Image, Dimensions } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import CarouselStyles from "../Styles/CarouselStyles";

const Carousel = () => {
    const originalImages = [
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800",
    ];

    const images = [...originalImages, originalImages[0]]; // Add first image to end for smooth transition
    const { width } = Dimensions.get("window");
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isTransitioningRef = useRef(false);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 0,
    };

    const viewabilityConfigCallbackPairs = useRef([
        {
            viewabilityConfig,
            onViewableItemsChanged: ({ viewableItems }) => {
                if (viewableItems.length > 0 && !isTransitioningRef.current) {
                    setCurrentIndex(viewableItems[0].index);
                }
            },
        },
    ]);

    const handleMomentumScrollEnd = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(offsetX / width);

        if (newIndex === images.length - 1) {
            isTransitioningRef.current = true;
            setTimeout(() => {
                flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
                setCurrentIndex(0);
                isTransitioningRef.current = false;
            }, 300);
        }
    };

    const getItemLayout = (_, index) => ({
        length: width,
        offset: width * index,
        index,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isTransitioningRef.current) {
                const nextIndex = (currentIndex + 1) % images.length;
                flatListRef.current?.scrollToOffset({
                    offset: nextIndex * width,
                    animated: true,
                });
            }
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [currentIndex]);

    return (
        <View style={CarouselStyles.container}>
            <FlatList
                ref={flatListRef}
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                getItemLayout={getItemLayout}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                initialNumToRender={images.length}
                maxToRenderPerBatch={images.length}
                renderItem={({ item }) => (
                    <View style={[CarouselStyles.imageWrapper, { width }]}>
                        <Image source={{ uri: item }} style={CarouselStyles.image} />
                    </View>
                )}
            />
            <View style={CarouselStyles.dotContainer}>
                {originalImages.map((_, index) => (
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
