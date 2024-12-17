import { View, FlatList, Image, Dimensions, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import CarouselStyles from "../Styles/CarouselStyles";
import { supabase } from "../lib/supabase";

const Carousel = () => {
  const [originalImages, setOriginalImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width } = Dimensions.get("window");
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTransitioningRef = useRef(false);
  const autoScrollTimer = useRef(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Fetch images from Supabase
  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const { data, error } = await supabase
          .from("carousel_images")
          .select("id, image_url, display_order")
          .order("display_order", { ascending: true });

        if (error) throw error;

        setOriginalImages(data.map((img) => img.image_url));
      } catch (err) {
        console.error("Failed to fetch images:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselImages();
  }, []);

  // Add first image to the end for smooth looping
  const images = originalImages.length > 0 ? [...originalImages, originalImages[0]] : [];

  const startAutoScroll = () => {
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);

    autoScrollTimer.current = setInterval(() => {
      if (!isUserInteracting && !isTransitioningRef.current && flatListRef.current && images.length > 1) {
        const nextIndex = (currentIndex + 1) % images.length;
        flatListRef.current.scrollToOffset({
          offset: nextIndex * width,
          animated: true,
        });
      }
    }, 3000);
  };

  const handleMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);

    if (newIndex === images.length - 1) {
      isTransitioningRef.current = true;
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({ offset: 0, animated: false });
          setCurrentIndex(0);
        }
        isTransitioningRef.current = false;
      }, 50);
    } else {
      setCurrentIndex(newIndex);
    }

    setIsUserInteracting(false);
    startAutoScroll();
  };

  const handleScrollBeginDrag = () => {
    setIsUserInteracting(true);
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
  };

  const getItemLayout = (_, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  // Auto-scroll management
  useEffect(() => {
    if (images.length > 1) startAutoScroll();

    return () => {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    };
  }, [currentIndex, images.length]);

  if (loading) {
    return (
      <View style={CarouselStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || images.length === 0) {
    return (
      <View style={CarouselStyles.container}>
        <Text>Failed to load carousel images</Text>
      </View>
    );
  }

  return (
    <View style={CarouselStyles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScrollBeginDrag={handleScrollBeginDrag}
        renderItem={({ item }) => (
          <View style={[CarouselStyles.imageWrapper, { width }]}>
            <Image
              source={{ uri: item }}
              style={CarouselStyles.image}
              resizeMode="cover"
            />
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

export default Carousel;
