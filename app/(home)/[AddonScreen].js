import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { addAddonToItem, removeAddonFromItem } from "../../redux/CartReducer";
import Menu from "../../data/MenuData.json"; // Assuming MenuData is stored here

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
        {
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 8,
          marginVertical: 8,
          borderWidth: 1,
          borderColor: "#ddd",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        selectedAddons.some((addon) => addon.id === item.id) && {
          backgroundColor: "#f0f8ff",
          borderColor: "#4caf50",
          borderWidth: 2,
        },
      ]}
      onPress={() => handleAddonSelection(item)}
    >
      <Text style={{ fontSize: 16, color: "#333" }}>{item.name}</Text>
      <Text style={{ fontSize: 16, color: "#666" }}>Rs. {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f8f8", padding: 16 }}>
      {selectedItem ? (
        <>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20, textAlign: "center" }}>
            Addons for {name}
          </Text>
          <FlatList
            data={itemAddons}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderAddonItem}
            ListEmptyComponent={<Text>No addons available</Text>}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#4caf50",
              paddingVertical: 12,
              borderRadius: 8,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleDone}
          >
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Done</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{ fontSize: 18, color: "#888", textAlign: "center" }}>Loading...</Text>
      )}
    </View>
  );
};

export default AddonScreen;
