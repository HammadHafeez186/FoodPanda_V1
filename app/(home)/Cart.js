import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart, cleanCart } from "../../redux/CartReducer";
import Instructions from "../../data/Instructions.json";
import styles from "../../Styles/CartStyles";
import { supabase } from '../../lib/supabase';
import restaurantData from "../../data/dataRestaurantMenu.json";

// Helper function to calculate total price
const calculateTotalPrice = (cart) => {
    if (!Array.isArray(cart) || cart.length === 0) return 0;
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
    const { items: cart, currentHotelId } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [discountInfo, setDiscountInfo] = useState({ percentage: 0, minOrder: 0, maxDiscount: 0 });

    useEffect(() => {
        // Fetch discount info from the restaurant data
        const fetchDiscountInfo = () => {
            const restaurant = restaurantData.restaurants.find(r => r.id === currentHotelId);
            if (restaurant && restaurant.discount) {
                setDiscountInfo({
                    percentage: restaurant.discount.percentage,
                    minOrder: restaurant.discount.min_order,
                    maxDiscount: restaurant.discount.max_discount
                });
            }
        };
        fetchDiscountInfo();
    }, [currentHotelId]);

    // Calculate the total price (including addons)
    const totalPrice = calculateTotalPrice(cart);
    const isDiscountApplicable = totalPrice >= discountInfo.minOrder;
    const discountAmount = isDiscountApplicable 
        ? Math.min((totalPrice * discountInfo.percentage) / 100, discountInfo.maxDiscount) 
        : 0;
    const discountedTotal = totalPrice - discountAmount;
    const deliveryFee = Math.floor(discountedTotal * 0.2);
    const deliveryPartnerFee = Math.floor(deliveryFee * 0.2);
    const addOnByItem = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (item.addons?.reduce((addonSum, addon) => addonSum + addon.price, 0) || 0), 0) : 0;
    const finalPrice = discountedTotal + deliveryFee + deliveryPartnerFee;

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
                    onPress={() => dispatch(decrementQuantity({ id: item.id, hotel_id: item.hotel_id }))}
                    style={styles.quantityButton}
                >
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                    onPress={() => dispatch(incrementQuantity({ id: item.id, hotel_id: item.hotel_id }))}
                    style={styles.quantityButton}
                >
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => dispatch(removeFromCart({ id: item.id, hotel_id: item.hotel_id }))}
                style={styles.removeButton}
            >
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    router.replace({
                        pathname: "/AddonScreen",
                        params: { itemId: item.id, name: item.name, hotel_id: item.hotel_id }
                    });
                }}
                style={styles.customizeButton}
            >
                <Text style={styles.customizeButtonText}>Customize</Text>
            </TouchableOpacity>

            {item.addons && item.addons.length > 0 && (
                <View style={styles.addonsContainer}>
                    <Text style={styles.addonsTitle}>Addons:</Text>
                    {item.addons.map((addon) => (
                        <Text key={addon.id} style={styles.addonItem}>
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

    // Function to upload cart data to Supabase
    const uploadCartData = async (userId, cartItems) => {
        try {
            for (const item of cartItems) {
                const { data: cartItem, error: cartItemError } = await supabase
                    .from('cart_items')
                    .insert({
                        user_id: userId,
                        hotel_id: item.hotel_id,
                        item_name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    })
                    .select()
                    .single();

                if (cartItemError) throw cartItemError;

                if (item.addons && item.addons.length > 0) {
                    const addons = item.addons.map(addon => ({
                        cart_item_id: cartItem.id,
                        addon_name: addon.name,
                        addon_price: addon.price
                    }));

                    const { error: addonsError } = await supabase
                        .from('cart_item_addons')
                        .insert(addons);

                    if (addonsError) throw addonsError;
                }
            }

            console.log('Cart data uploaded successfully');
        } catch (error) {
            console.error('Error uploading cart data:', error);
            throw error;
        }
    };

    // Disable the "Place Order" button if finalPrice is less than 500
    const isPlaceOrderDisabled = finalPrice < 500;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{params?.name}</Text>
            </View>

            <View style={styles.deliveryContainer}>
                <Text style={styles.deliveryText}>Delivery in 35 to 40 min.</Text>
            </View>

            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>ITEM(S) ADDED</Text>
            </View>

            {Array.isArray(cart) && cart.length > 0 ? (
                <FlatList
                    data={cart}
                    keyExtractor={(item) => `${item.id}-${item.hotel_id}`}
                    renderItem={renderCartItem}
                    scrollEnabled={false}
                />
            ) : (
                <View>
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                </View>
            )}

            {Array.isArray(cart) && cart.length > 0 && (
                <View style={styles.deliveryInstructionsContainer}>
                    <Text style={styles.deliveryInstructionHeading}>Delivery Instruction</Text>
                    <FlatList
                        data={Instructions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderInstructionItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}

            {Array.isArray(cart) && cart.length > 0 && (
                <View style={styles.billingContainer}>
                    <Text style={styles.billingTitle}>Billing Details</Text>
                    <View style={styles.billingDetails}>
                        <View style={styles.billingRow}>
                            <Text>Item(s) Total</Text>
                            <Text>Rs. {totalPrice.toFixed(2)}</Text>
                        </View>
                        {isDiscountApplicable ? (
                            <View style={styles.billingRow}>
                                <Text>Discount ({discountInfo.percentage}%)</Text>
                                <Text>- Rs. {discountAmount.toFixed(2)}</Text>
                            </View>
                        ) : (
                            <View style={styles.billingRow}>
                                <Text>Minimum order for {discountInfo.percentage}% discount: Rs. {discountInfo.minOrder}</Text>
                            </View>
                        )}
                        <View style={styles.billingRow}>
                            <Text>Discounted Total</Text>
                            <Text>Rs. {discountedTotal.toFixed(2)}</Text>
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
                            <Text style={styles.totalText}>To pay</Text>
                            <Text style={styles.totalAmount}>Rs. {finalPrice.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            )}

            {Array.isArray(cart) && cart.length > 0 && (
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.paymentMethod}>
                        <View>
                            <Text style={styles.paymentMethodTitle}>Pay using Cash</Text>
                            <Text style={styles.paymentMethodSubtitle}>Cash on Delivery (Only)</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.placeOrderButton, { backgroundColor: isPlaceOrderDisabled ? "gray" : "#FF2B85" }]}
                            onPress={async () => {
                                if (isPlaceOrderDisabled) return;

                                try {
                                    const { data: { user } } = await supabase.auth.getUser()
                                    if (!user) throw new Error('No user logged in');

                                    await uploadCartData(user.id, cart);

                                    dispatch(cleanCart());
                                    router.replace({
                                        pathname: "/Order",
                                        params: { name: params.name },
                                    });
                                } catch (error) {
                                    console.error('Error placing order:', error);
                                    Alert.alert('Error', 'Failed to place order. Please try again.');
                                }
                            }}
                        >
                            <View style={styles.placeOrderButtonContent}>
                                <Text style={styles.placeOrderText}>Rs. {finalPrice.toFixed(2)}</Text>
                                <Text style={styles.placeOrderButtonText}>
                                    {isPlaceOrderDisabled ? "No Order" : "Place Order"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

export default Cart;

