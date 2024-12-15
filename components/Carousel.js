import { View, FlatList, Image, Dimensions } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import CarouselStyles from "../Styles/CarouselStyles";

const Carousel = () => {
    const originalImages = [
        "https://images.deliveryhero.io/image/fd-pk/campaign-assets/gallery/2f41a9b0-97b8-11ef-8f93-f69661d3e0b7.png?height=240&quality=95&width=560&",
        "https://images.deliveryhero.io/image/fd-pk/campaign-assets/2b3f9327-556a-11ef-b6d6-eefe8b50f562/desktop_tile_EnMOif.png?height=240&quality=95&width=560&",
        "https://images.deliveryhero.io/image/fd-pk/campaign-assets/8c9793b4-aca1-11ef-825c-063ba5777583/desktop_tile_EncQhg.png?height=240&quality=95&width=560&",
        "https://images.deliveryhero.io/image/fd-pk/campaign-assets/52534de4-c42d-11ee-b7f6-5ab5b78bc0dc/desktop_tile_EnsHKq.png?height=240&quality=95&width=560&",    
        "https://images.deliveryhero.io/image/fd-pk/campaign-assets/4093d15c-9de4-11ef-a9a9-f69be65d38e7/desktop_tile_EnysVt.png?height=240&quality=95&width=560&",
        "https://images.deliveryhero.io/image/fd-pk/campaign-assets/ed935765-001c-11ef-9b51-56b33318eaf5/desktop_tile_EnnNLP.png?height=240&quality=95&width=560&",    
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
            }, 500);
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
