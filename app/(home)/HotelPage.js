import React, { useCallback, useState, useEffect } from "react";
import { View, Text, Pressable, Alert, TouchableOpacity, Image, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FoodItem from "../../components/FoodItem";
import restaurantData from "../../data/dataRestaurantMenu.json";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, addToCart, removeFromCart, resetCart } from "../../redux/CartReducer";
import styles from "../../Styles/HotelPageStyles";

const HotelPage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { items: cart, currentHotelId } = useSelector((state) => state.cart);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const foundRestaurant = restaurantData.restaurants.find(r => r.id === params.id);
    setRestaurant(foundRestaurant);
  }, [params.id]);

  const handleAddToCart = useCallback((foodItem) => {
    if (currentHotelId && currentHotelId !== restaurant.id) {
      Alert.alert(
        "Clear cart?",
        "You have items in your cart from a different restaurant. Would you like to clear your cart and add items from this restaurant?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Clear and Add",
            onPress: () => {
              dispatch(resetCart());
              dispatch(addToCart({ ...foodItem, quantity: 1, hotel_id: restaurant.id }));
            }
          }
        ]
      );
    } else {
      dispatch(addToCart({ ...foodItem, quantity: 1, hotel_id: restaurant.id }));
    }
  }, [currentHotelId, restaurant, dispatch]);

  const handleQuantityChange = useCallback((foodItem, action) => {
    if (action === 'increment') {
      dispatch(incrementQuantity({ id: foodItem.id }));
    } else if (action === 'decrement') {
      dispatch(decrementQuantity({ id: foodItem.id }));
    }
  }, [dispatch]);

  const renderFoodItem = useCallback(({ item }) => (
    <FoodItem
      item={item}
      onAddToCart={handleAddToCart}
      onQuantityChange={handleQuantityChange}
      cartItems={cart}
      discountPercentage={restaurant.discount.percentage}
    />
  ), [handleAddToCart, handleQuantityChange, cart, restaurant]);

  const renderHeader = useCallback(() => (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
      </View>

      <Image 
        source={{ uri: restaurant.featured_image }} 
        style={styles.bannerImage}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.cuisineText}>{restaurant.cuisines}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>{restaurant.aggregate_rating}</Text>
        </View>
      </View>

      {restaurant.discount.percentage > 0 && (
        <View style={styles.discountBanner}>
          <MaterialCommunityIcons name="tag" size={24} color="#FF2B85" />
          <Text style={styles.discountText}>{restaurant.discount.percentage}% off on all menu items</Text>
        </View>
      )}
    </>
  ), [restaurant, router]);

  if (!restaurant) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={restaurant.menu}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.menuContainer}
      />

      {cart.length > 0 && (
        <Pressable
          style={styles.viewCartButton}
          onPress={() => router.push({ pathname: "/Cart", params: { name: restaurant.name } })}
        >
          <Text style={styles.viewCartText}>
            View Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default HotelPage;

