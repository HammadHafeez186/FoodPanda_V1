import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, cleanCart } from "../../redux/CartReducer";
import Instructions from "../../data/Instructions.json";
import styles from "../../Styles/CartStyles";

const Cart = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const total = cart
        .map((item) => item.price * item.quantity)
        .reduce((curr, prev) => curr + prev, 0);
    const deliveryFee = Math.floor(total * 0.2);
    const deliveryPartnerFee = Math.floor(deliveryFee * 0.2);
    const finalPrice = total + deliveryFee + deliveryPartnerFee;

    // Render Cart Items
    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Rs.{item.price * item.quantity}</Text>
            <View style={styles.quantityContainer}>
                <Pressable
                    onPress={() => dispatch(decrementQuantity(item))}
                    style={styles.quantityButton}
                >
                    <Text style={styles.quantityButtonText}>-</Text>
                </Pressable>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <Pressable
                    onPress={() => dispatch(incrementQuantity(item))}
                    style={styles.quantityButton}
                >
                    <Text style={styles.quantityButtonText}>+</Text>
                </Pressable>
            </View>
        </View>
    );

    // Render Delivery Instructions
    const renderInstructionItem = ({ item }) => (
        <Pressable style={styles.deliveryIconPressable}>
            <View style={styles.deliveryInstructionView}>
                <FontAwesome5 name={item.iconName} size={20} color="black" />
                <Text style={styles.deliveryInstructionText}>{item.name}</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
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

            {/* Additional Options */}
            <FlatList
    data={[
        {
            icon: <Feather name="plus-circle" size={24} color="black" />,
            text: "Add more Items",
        },
        {
            icon: <Entypo name="new-message" size={24} color="black" />,
            text: "Add more cooking instructions",
        },
        {
            icon: <MaterialCommunityIcons name="food-fork-drink" size={24} color="black" />,
            text: "Don't Send cutlery with this order",
        },
        {
            customView: (
                <View style={{ padding: 10, backgroundColor: "white", marginVertical: 10 }}>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text>Feeding Donation to Pakistan</Text>
                            <AntDesign name="checksquare" size={24} color="#fd5c63" />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                            <Text style={{ color: "grey" }}>Working Towards a malnrution-free Pakistan</Text>
                            <Text>Rs. 50</Text>
                        </View>
                    </View>
                </View>
            )
        }
    ]}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
        item.customView ? item.customView : (
            <View style={styles.outerViewCircleAddMoreItems}>
                <View style={styles.innerViewCircleAddMoreItems}>
                    {item.icon}
                    <Text>{item.text}</Text>
                </View>
                <AntDesign name="right" size={24} color="black" />
            </View>
        )
    )}
/>

            {/* Billing Details */}
            {cart.length > 0 && (
                <View style={styles.billingContainer}>
                    <Text style={styles.billingTitle}>Billing Details</Text>
                    <View style={styles.billingDetails}>
                        <View style={styles.billingRow}>
                            <Text>Item(s) Total</Text>
                            <Text>Rs. {total}</Text>
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
                            <Text style={{ fontWeight: "bold" }}>To pay</Text>
                            <Text>Rs. {finalPrice}</Text>
                        </View>
                    </View>
                </View>
            )}

            {/* Footer */}
            {cart.length > 0 && (
                <View>
                    <Pressable
                        style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, backgroundColor: "white" }}
                    >
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>Pay using Cash</Text>
                            <Text style={{ marginTop: 7 }}>Cash on Delivery (Only)</Text>
                        </View>
                        <Pressable
                            style={styles.placeOrderButton}
                            onPress={() => {
                                dispatch(cleanCart());
                                router.replace({
                                    pathname: "/Order",
                                    params: { name: params.name },
                                });
                            }}
                        >
                            <View>
                                <Text style={styles.placeOrderText}>Rs. {finalPrice}</Text>
                                <Text style={styles.placeOrderSubText}>TOTAL</Text>
                            </View>
                            <Text style={styles.placeOrderButtonText}>Place Order</Text>
                        </Pressable>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default Cart;
