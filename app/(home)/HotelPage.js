import React, { useCallback, useState, useEffect } from "react";
import { View, FlatList, Text, Pressable, StyleSheet,Alert, Touchable, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import FoodItem from "../../components/FoodItem";
import restaurantData from "../../data/dataRestaurantMenu.json";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, addToCart, removeFromCart, resetCart } from "../../redux/CartReducer";
import hotelPageStyles from "../../Styles/HotelPageStyles";
import Ionicons from '@expo/vector-icons/Ionicons';

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

  const renderItem = useCallback(({ item }) => (
    <FoodItem
      item={item}
      key={item.id}
      onAddToCart={handleAddToCart}
      onQuantityChange={handleQuantityChange}
      cartItems={cart}
    />
  ), [handleAddToCart, handleQuantityChange, cart]);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  if (!restaurant) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={hotelPageStyles.container}>
      <View style={hotelPageStyles.headingsContainer}>
           <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons style={hotelPageStyles.restaurantName} name="arrow-back" size={24} color="black" />
           </TouchableOpacity>
           <Text style={hotelPageStyles.restaurantName}>{restaurant.name}</Text>
      </View>
      
      <FlatList
        data={restaurant.menu}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
      {cart.length > 0 && (
        <Pressable
          style={hotelPageStyles.viewCartButton}
          onPress={() => router.push({ pathname: "/Cart", params: { name: restaurant.name } })}
        >
          <Text style={hotelPageStyles.viewCartText}>
            View Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)
            
            
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default HotelPage;

