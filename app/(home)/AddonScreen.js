import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, Image } from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { addAddonToItem, removeAddonFromItem } from "../../redux/CartReducer";
import styles from "../../Styles/AddOnPageStyles";

const AddonPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    // Sample Addons for demonstration purposes (e.g., fizzy drinks, cheese slices, etc.)
    const sampleAddons = [
        { id: 1, name: "Extra Cheese Slice", price: 30, image: { uri: "https://example.com/cheese.png" } },
        { id: 2, name: "Fizzy Drink", price: 40, image: { uri: "https://example.com/drink.png" } },
        { id: 3, name: "Garlic Bread", price: 50, image: { uri: "https://example.com/bread.png" } },
        { id: 4, name: "Extra Sauce", price: 20, image: { uri: "https://example.com/sauce.png" } },
        { id: 5, name: "Pepperoni", price: 60, image: { uri: "https://example.com/pepperoni.png" } },
    ];

    // Handle Addon Selection
    const handleAddonSelection = (addon) => {
        if (selectedAddons.some((item) => item.id === addon.id)) {
            setSelectedAddons(selectedAddons.filter((item) => item.id !== addon.id));
            dispatch(removeAddonFromItem(currentItem.id, addon));
        } else {
            setSelectedAddons([...selectedAddons, addon]);
            dispatch(addAddonToItem(currentItem.id, addon));
        }
    };

    // Render Addon Item
    const renderAddonItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.addonItem,
                selectedAddons.some((addon) => addon.id === item.id) && styles.addonSelected,
            ]}
            onPress={() => handleAddonSelection(item)}
        >
            <Image source={item.image} style={styles.addonImage} />
            <View style={styles.addonInfo}>
                <Text style={styles.addonName}>{item.name}</Text>
                <Text style={styles.addonPrice}>Rs. {item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    // Get current item details
    useEffect(() => {
        if (cart.length > 0) {
            setCurrentItem(cart[0]);  // Set the first item as the current item for addon selection
        }
    }, [cart]);

    const item = cart.find((i) => i.id === currentItem?.id);

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.headerTitle}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Ons</Text>
            </View>

            {/* Current Item Name */}
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>Customize {item?.name}</Text>
                <Text style={styles.itemDescription}>{item?.description}</Text>
            </View>

            {/* Addon Items List */}
            <FlatList
                data={sampleAddons} // Using sampleAddons for addon selection
                keyExtractor={(addon) => addon.id.toString()}
                renderItem={renderAddonItem}
            />

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.placeOrderButton}
                    onPress={() => {
                        router.back();
                    }}
                >
                    <Text style={styles.placeOrderButtonText}>Done</Text>
                </TouchableOpacity>
            </View>

            {/* Customization Modal */}
            <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Customize {currentItem?.name}</Text>
                    {/* Add more customization options here */}
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default AddonPage;
