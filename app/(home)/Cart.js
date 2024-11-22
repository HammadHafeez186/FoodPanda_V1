import { View, Text, ScrollView, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from '../../redux/CartReducer';
import Instructions from "../../data/Instructions.json";
import { FontAwesome5 } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from "../../Styles/CartStyles";

const Cart = () => {
    const params = useLocalSearchParams();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
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
            </View>
        </ScrollView>
    );
};

export default Cart;
