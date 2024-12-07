import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../Styles/AddOnStyles";

const AddOnScreen = () => {
  const router = useRouter();

  // State for managing add-ons selection
  const [addOns, setAddOns] = useState([
    { id: "1", name: "Coke", size: "", quantity: 0 },
    { id: "2", name: "Sprite", size: "", quantity: 0 },
    { id: "3", name: "Fanta", size: "", quantity: 0 },
    { id: "4", name: "Fries", size: "", quantity: 0 },
  ]);

  const [recommended, setRecommended] = useState([
    { id: "5", name: "Pizza", size: "Regular", quantity: 0 },
    { id: "6", name: "Burger", size: "Large", quantity: 0 },
  ]);

  // Handle size change
  const handleSizeChange = (id, size) => {
    const updatedAddOns = addOns.map((addon) =>
      addon.id === id ? { ...addon, size } : addon
    );
    setAddOns(updatedAddOns);
  };

  // Handle quantity change
  const handleQuantityChange = (id, quantity) => {
    const updatedAddOns = addOns.map((addon) =>
      addon.id === id ? { ...addon, quantity } : addon
    );
    setAddOns(updatedAddOns);
  };

  // Handle Add-ons Submission
  const handleSubmitAddOns = () => {
    const selectedAddOns = [...addOns, ...recommended].filter(
      (addon) => addon.size && addon.quantity > 0
    );
    if (selectedAddOns.length === 0) {
      Alert.alert("No Add-ons Selected", "Please select at least one add-on.");
      return;
    }
    // Redirect to Cart or the next screen
    router.replace("/Cart");
  };

  // Render Add-on Item
  const renderAddOnItem = ({ item }) => (
    <View style={styles.addOnItem}>
      <Text style={styles.addOnName}>{item.name}</Text>
      <TextInput
        style={styles.sizeInput}
        placeholder="Enter size (e.g., Medium)"
        value={item.size}
        onChangeText={(size) => handleSizeChange(item.id, size)}
      />
      <TextInput
        style={styles.quantityInput}
        placeholder="Enter quantity"
        keyboardType="numeric"
        value={item.quantity ? item.quantity.toString() : ""}
        onChangeText={(quantity) => handleQuantityChange(item.id, parseInt(quantity))}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Extra Items</Text>
      </View>

      {/* Add-on Items */}
      <FlatList
        data={addOns}
        keyExtractor={(item) => item.id}
        renderItem={renderAddOnItem}
      />

      {/* Recommended Food Items */}
      <Text style={styles.recommendedText}>Recommended Add-ons</Text>
      <FlatList
        data={recommended}
        keyExtractor={(item) => item.id}
        renderItem={renderAddOnItem}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAddOns}>
        <Text style={styles.submitButtonText}>Submit Add-ons</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddOnScreen;
