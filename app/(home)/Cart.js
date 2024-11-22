import React from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../redux/CartReducer";
import Instructions from "../../data/Instructions.json";
import { FontAwesome5, Feather, AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import CartStyles from "../../Styles/CartStyles";

const Cart = () => {
    const params = useLocalSearchParams();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <ScrollView style={CartStyles.container}>
            {/* Header Section */}
            <View style={CartStyles.header}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
                <Text style={CartStyles.headerTitle}>{params?.name}</Text>
            </View>

            {/* Delivery Info */}
            <View style={CartStyles.deliveryContainer}>
                <Text style={CartStyles.deliveryText}>Delivery in 35 to 40 min.</Text>
            </View>

            {/* Section Title */}
            <View style={CartStyles.sectionTitleContainer}>
                <Text style={CartStyles.sectionTitle}>ITEM(S) ADDED</Text>
            </View>

            {/* Cart Items */}
            <View>
                {cart.map((item, index) => (
                    <View key={index} style={CartStyles.cartItem}>
                        <Text style={CartStyles.itemName}>{item.name}</Text>
                        <Text style={CartStyles.itemPrice}>Rs.{item.price * item.quantity}</Text>

                        <View style={CartStyles.quantityContainer}>
                            <Pressable
                                onPress={() => dispatch(decrementQuantity(item))}
                                style={CartStyles.quantityButton}
                            >
                                <Text style={CartStyles.quantityButtonText}>-</Text>
                            </Pressable>

                            <Text style={CartStyles.quantityText}>{item.quantity}</Text>

                            <Pressable
                                onPress={() => dispatch(incrementQuantity(item))}
                                style={CartStyles.quantityButton}
                            >
                                <Text style={CartStyles.quantityButtonText}>+</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}

                <View style={{ marginVertical: 10 }}>
                    <Text style={CartStyles.deliveryInstructionHeading}>Delivery Instruction</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {Instructions.map((item, index) => (
                            <Pressable style={CartStyles.deliveryIconPressable} key={index}>
                                <View style={CartStyles.deliveryInstructionView}>
                                    <FontAwesome5 name={item?.iconName} size={20} color="black" />
                                    <Text style={CartStyles.deliveryInstructionText}>{item.name}</Text>
                                </View>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

                {/* Additional Options */}
                <View style={CartStyles.outerViewCircleAddMoreItems}>
                    <View style={CartStyles.innerViewCircleAddMoreItems}>
                        <Feather name="plus-circle" size={24} color="black" />
                        <Text style={CartStyles.optionText}>Add more Items</Text>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                </View>

                <View style={CartStyles.outerViewCircleAddMoreItems}>
                    <View style={CartStyles.innerViewCircleAddMoreItems}>
                        <Entypo name="new-message" size={24} color="black" />
                        <Text style={CartStyles.optionText}>Add more cooking instructions</Text>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                </View>

                <View style={CartStyles.outerViewCircleAddMoreItems}>
                    <View style={CartStyles.innerViewCircleAddMoreItems}>
                        <MaterialCommunityIcons name="food-fork-drink" size={24} color="black" />
                        <Text style={CartStyles.optionText}>Don't send cutlery with this order</Text>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                </View>
            </View>
        </ScrollView>
    );
};

export default Cart;
