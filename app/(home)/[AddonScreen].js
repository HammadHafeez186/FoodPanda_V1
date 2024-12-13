import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { addAddonToItem, removeAddonFromItem } from "../../redux/CartReducer";
import Menu from "../../data/MenuData.json"; // Assuming MenuData is stored here
import { styles } from '../../Styles/AddOnStyles';  // Import styles

const AddonScreen = () => {
  const { itemId, name, addons: initialAddons } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState(initialAddons || []);

  useEffect(() => {
    // Find the selected item from the cart based on the itemId
    const item = cart.find((item) => item.id === itemId);
    if (item) {
      setSelectedItem(item);
      setSelectedAddons(item.addons || []);
    }
  }, [cart, itemId]);

  const itemAddons = Menu.find((category) =>
    category.items.some((item) => item.id === itemId)
  )
    ?.items.find((item) => item.id === itemId)
    ?.addons || [];

  // Handle Addon Selection
  const handleAddonSelection = (addon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      // Remove Addon
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
      dispatch(removeAddonFromItem({ itemId: selectedItem.id, addon }));
    } else {
      // Add Addon
      setSelectedAddons([...selectedAddons, addon]);
      dispatch(addAddonToItem({ itemId: selectedItem.id, addon }));
    }
  };

  // Handle Done
  const handleDone = () => {
    // Update the selectedItem with new addons in Redux
    dispatch(addAddonToItem({ itemId: setSelectedItem.id, addons: selectedAddons }));
    router.replace("/Cart"); // Navigate back to the Cart screen
  };

  // Render Addon Items
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
