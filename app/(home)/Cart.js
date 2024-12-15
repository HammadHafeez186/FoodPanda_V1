import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, cleanCart } from "../../redux/CartReducer";
import Instructions from "../../data/Instructions.json";
import styles from "../../Styles/CartStyles";
import AddonScreen from "./[AddonScreen]";

// Helper function to calculate total price
const calculateTotalPrice = (cart) => {
    return cart
      .map((item) => {
        const addonTotal = item.addons?.reduce((sum, addon) => sum + addon.price, 0) || 0;
        return (item.price + addonTotal) * item.quantity;
      })
      .reduce((curr, prev) => curr + prev, 0);
};

const Cart = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // Calculate the total price (including addons)
    const totalPrice = calculateTotalPrice(cart);
    const deliveryFee = Math.floor(totalPrice * 0.2);
    const deliveryPartnerFee = Math.floor(deliveryFee * 0.2);
    const addOnByItem = cart.map((item) => item.addons.reduce((sum, addon) => sum + addon.price, 0)).reduce((sum, price) => sum + price, 0);
    const finalPrice = totalPrice + deliveryFee + deliveryPartnerFee;

    // Render Cart Items
    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>
                Rs.{" "}
                {(
                    item.price * item.quantity +
                    (item.addons ? item.addons.reduce((sum, addon) => sum + addon.price, 0) : 0)
                ).toFixed(2)}
            </Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    onPress={() => dispatch(decrementQuantity(item))}
                    style={styles.quantityButton}
                >
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                    onPress={() => dispatch(incrementQuantity(item))}
                    style={styles.quantityButton}
                >
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Customize Button */}
            <TouchableOpacity
                onPress={() => {
                    // Pass relevant parameters to the Addons screen
                    router.replace({
                        pathname: "/AddonScreen",
                        params: { itemId: item.id, name: item.name, addons: item.addons }
                    });
                }}
                style={styles.customizeButton}
            >
                <Text style={styles.customizeButtonText}>Customize</Text>
            </TouchableOpacity>

            {/* Addon Items Section */}
            {item.addons && item.addons.length > 0 && (
                <View style={{ backgroundColor: "#f5f5f5", padding: 10, marginTop: 10, borderRadius: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 5 }}>Addons:</Text>
                    {item.addons.map((addon) => (
                        <Text key={addon.id} style={{ fontSize: 14, color: "#555" }}>
                            {addon.name} - Rs. {addon.price}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );

    // Render Delivery Instructions
    const renderInstructionItem = ({ item }) => (
        <TouchableOpacity style={styles.deliveryIconPressable}>
            <View style={styles.deliveryInstructionView}>
                <FontAwesome5 name={item.iconName} size={20} color="black" />
                <Text style={styles.deliveryInstructionText}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    // Disable the "Place Order" button if finalPrice is less than 500
    const isPlaceOrderDisabled = finalPrice < 500;

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{params?.name}</Text>
            </View>

            {/* Delivery Info */}
            <View style={styles.deliveryContainer}>
                <Text style={styles.deliveryText}>Delivery in 35 to 40 min.</Text>
            </View>

            {/* Section Title */}
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>ITEM(S) ADDED</Text>
            </View>

            {/* Cart Items */}
            <FlatList
                data={cart}
                keyExtractor={(item, index) => item.id || index.toString()}
                renderItem={renderCartItem}
                ListEmptyComponent={
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: "600" }}>Your cart is empty</Text>
                    </View>
                }
            />

            {/* Delivery Instructions */}
            {cart.length > 0 && (
                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.deliveryInstructionHeading}>Delivery Instruction</Text>
                    <FlatList
                        data={Instructions}
                        keyExtractor={(item, index) => item.id || index.toString()}
                        renderItem={renderInstructionItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}

            {/* Billing Details */}
            {cart.length > 0 && (
                <View style={styles.billingContainer}>
                    <Text style={styles.billingTitle}>Billing Details</Text>
                    <View style={styles.billingDetails}>
                        <View style={styles.billingRow}>
                            <Text>Item(s) Total</Text>
                            <Text>Rs. {totalPrice.toFixed(2)}</Text>
                        </View>
                        <View style={styles.billingRow}>
                            <Text>Delivery Fee</Text>
                            <Text>Rs. {deliveryFee}</Text>
                        </View>
                        <View style={styles.billingRow}>
                            <Text>Delivery Partner Fee</Text>
                            <Text>Rs. {deliveryPartnerFee}</Text>
                        </View>
                        <View style={styles.billingRow}>
                            <Text>Addon Fee</Text>
                            <Text>Rs. {addOnByItem}</Text>
                        </View>
                        <View style={styles.billingRow}>
                            <Text style={{ fontWeight: "bold" }}>To pay</Text>
                            <Text>Rs. {finalPrice.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            )}

            {/* Footer */}
            {cart.length > 0 && (
                <View>
                    <TouchableOpacity
                        style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, backgroundColor: "white" }}
                    >
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>Pay using Cash</Text>
                            <Text style={{ marginTop: 7 }}>Cash on Delivery (Only)</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.placeOrderButton, { backgroundColor: isPlaceOrderDisabled ? "gray" : "#FF2B85" }]}
                            onPress={() => {
                                if (isPlaceOrderDisabled) return;
                                dispatch(cleanCart());
                                router.replace({
                                    pathname: "/Order",
                                    params: { name: params.name },
                                });
                            }}
                        >
                            <View style = {{allignItems: 'center'}}>
                                <Text style={styles.placeOrderText}>Rs. {finalPrice.toFixed(2)}</Text>
                            
                            <Text style={styles.placeOrderButtonText}>
                                {isPlaceOrderDisabled ? "No Order" : "Place Order"}
                            </Text>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default Cart;
