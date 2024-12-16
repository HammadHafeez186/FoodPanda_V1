import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { addAddonToItem, removeAddonFromItem, updateItemPrice } from "../../redux/CartReducer";
import restaurantData from "../../data/dataRestaurantMenu.json";
import { styles } from '../../Styles/AddOnStyles';

const AddonScreen = () => {
  const { itemId, name, hotel_id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { items: cart } = useSelector((state) => state.cart);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

  useEffect(() => {
    const item = cart.find((item) => item.id === itemId && item.hotel_id === hotel_id);
    if (item) {
      setSelectedItem(item);
      setSelectedAddons(item.addons || []);
    }
  }, [cart, itemId, hotel_id]);

  const restaurant = restaurantData.restaurants.find(r => r.id === hotel_id);
  const menuItem = restaurant?.menu
    .flatMap(category => category.items)
    .find(item => item.id === itemId);

  const itemAddons = menuItem?.addons || [];

  const handleAddonSelection = (addon) => {
    const isSelected = selectedAddons.some((a) => a.id === addon.id);
    let updatedAddons;

    if (isSelected) {
      updatedAddons = selectedAddons.filter((a) => a.id !== addon.id);
      dispatch(removeAddonFromItem({ itemId, hotel_id, addonId: addon.id }));
    } else {
      updatedAddons = [...selectedAddons, addon];
      dispatch(addAddonToItem({ itemId, hotel_id, addon }));
    }

    setSelectedAddons(updatedAddons);

    // Update the item price
    const newPrice = calculateNewPrice(menuItem.price, updatedAddons);
    dispatch(updateItemPrice({ itemId, hotel_id, newPrice }));
  };

  const calculateNewPrice = (basePrice, addons) => {
    return addons.reduce((total, addon) => total + addon.price, basePrice);
  };

  const handleDone = () => {
    router.replace("/Cart");
  };

  const renderAddonItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.addonItem,
        selectedAddons.some((addon) => addon.id === item.id) && styles.addonItemSelected,
      ]}
      onPress={() => handleAddonSelection(item)}
    >
      <Text style={styles.addonText}>{item.name}</Text>
      <Text style={styles.addonPrice}>Rs. {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {selectedItem ? (
        <>
          <Text style={styles.header}>Addons for {name}</Text>
          <FlatList
            data={itemAddons}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderAddonItem}
            ListEmptyComponent={<Text style={styles.emptyText}>No addons available</Text>}
          />
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

export default AddonScreen;

