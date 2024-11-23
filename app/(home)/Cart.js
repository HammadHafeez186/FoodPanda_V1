import { View, Text, ScrollView, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import {useLocalSearchParams, useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, cleanCart } from '../../redux/CartReducer';
import Instructions from "../../data/Instructions.json";
import { FontAwesome5 } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from "../../Styles/CartStyles";

const Cart = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const total = cart.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);
    const deliveryFee = Math.floor(total * 0.2);
    const deliveryPartnerFee = Math.floor(deliveryFee * 0.2);
    const finalPrice = total + deliveryFee + deliveryPartnerFee;

    return (
        <>
            <ScrollView style={styles.container}>
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
                <View>
                    {cart.map((item, index) => (
                        <View key={item.id || index} style={styles.cartItem}>
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
                    ))}
                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.deliveryInstructionHeading}>Delivery Instruction</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {Instructions.map((item, index) => (
                                <Pressable key={item.id || index} style={styles.deliveryIconPressable}>
                                    <View style={styles.deliveryInstructionView}>
                                        <FontAwesome5 name={item?.iconName} size={20} color="black" />
                                        <Text style={styles.deliveryInstructionText}>{item.name}</Text>
                                    </View>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.outerViewCircleAddMoreItems}>
                        <View style={styles.innerViewCircleAddMoreItems}>
                            <Feather name="plus-circle" size={24} color="black" />
                            <Text style={{ paddingVertical: 3 }}>Add more Items</Text>
                        </View>
                        <AntDesign name="right" size={24} color="black" />
                    </View>

                    <View style={styles.outerViewCircleAddMoreItems}>
                        <View style={styles.innerViewCircleAddMoreItems}>
                            <Entypo name="new-message" size={24} color="black" />
                            <Text style={{ paddingVertical: 3 }}>Add more cooking instructions</Text>
                        </View>
                        <AntDesign name="right" size={24} color="black" />
                    </View>

                    <View style={styles.outerViewCircleAddMoreItems}>
                        <View style={styles.innerViewCircleAddMoreItems}>
                            <MaterialCommunityIcons name="food-fork-drink" size={24} color="black" />
                            <Text style={{ paddingVertical: 3 }}>Don't Send cutlery with this order</Text>
                        </View>
                        <AntDesign name="right" size={24} color="black" />
                    </View>
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
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", }}>Billing Details</Text>
                        <View style={{ backgroundColor: "white", borderRadius: 7, padding: 10, marginTop: 14 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}>Item(s) Total</Text>
                                <Text style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}>Rs. {total}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 8 }}>
                                <Text style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}>Delivery Fee</Text>
                                <Text style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}>Rs. {deliveryFee}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}>Delivery Partner Fee</Text>
                                <Text style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}>Rs. {deliveryPartnerFee}</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>To pay</Text>
                                    <Text>Rs. {finalPrice}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {total === 0 ? (
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>Your cart is empty</Text>
                </View>
            ) : (
                <View>
                    <Pressable style={{ flexDirection: "row", alignItems: "center", padding: 20, justifyContent: "space-between", backgroundColor: "white" }} >
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>Pay using Cash</Text>
                            <Text style={{ marginTop: 7, fontSize: 15 }}>Cash on Delivery (Only)</Text>
                        </View>
                        <Pressable onPress={() => {
                            dispatch(cleanCart());
                            router.replace({
                                pathname: "/Order",
                                params: {
                                    name: params.name
                                }
                            })
                        }}
                            style={{ backgroundColor: "#fd5c63", padding: 10, width: 200, borderRadius: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                            <View>
                                <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>Rs. {finalPrice}</Text>
                                <Text style={{ fontSize: 15, color: "white", fontWeight: "500", marginTop: 3 }}>TOTAL</Text>
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>Place Order</Text>
                        </Pressable>
                    </Pressable>
                </View>
            )}

        </>
    );
};

export default Cart;
