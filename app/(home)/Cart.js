import {StyleSheet, View, Text, ScrollView, Pressable} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import {router, useLocalSearchParams} from "expo-router";
import {useSelector, useDispatch} from "react-redux";
import {incrementQuantity, decrementQuantity} from '../../redux/CartReducer';
import Instructions from "../../data/Instructions.json";
import {FontAwesome5} from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
                    <View key={index} style={styles.cartItem}>
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
                <View style={{marginVertical:10}}>
                    <Text style={styles.deliveryInstructionHeading}>Delivery Instruction</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {Instructions.map((item, index) => (
                        <Pressable style={styles.deliveryIconPressable}>
                            <View key={index} style={styles.deliveryInstructionView}>
                                <FontAwesome5 name={item?.iconName} size={20} color="black"/>
                                <Text style={styles.deliveryInstructionText}>{item.name}</Text>
                            </View>
                        </Pressable>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.outerViewCircleAddMoreItems}>
                    <View style={styles.innerViewCircleAddMoreItems}>
                        <Feather name="plus-circle" size={24} color="black" />
                        <Text style={{paddingVertical:3}}>Add more Items</Text>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                </View>

                <View style={styles.outerViewCircleAddMoreItems}>
                    <View style={styles.innerViewCircleAddMoreItems}>
                        <Entypo name="new-message" size={24} color="black" />
                        <Text style={{paddingVertical:3}}>Add more cooking instructions</Text>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                </View>

                <View style={styles.outerViewCircleAddMoreItems}>
                    <View style={styles.innerViewCircleAddMoreItems}>
                        <MaterialCommunityIcons name="food-fork-drink" size={24} color="black" />
                        <Text style={{paddingVertical:3}}>Don't Send cutlery with this order</Text>
                    </View>
                    <AntDesign name="right" size={24} color="black" />
                </View>
            </View>
        </ScrollView>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    deliveryContainer: {
        backgroundColor: "white",
        padding: 15,
        marginTop: 15,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    deliveryText: {
        fontWeight: "500",
        fontSize: 14,
    },
    sectionTitleContainer: {
        marginVertical: 12,
    },
    sectionTitle: {
        textAlign: "center",
        letterSpacing: 3,
        fontSize: 16,
        color: "grey",
    },
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemName: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "600",
        color: "#007BFF",
        paddingHorizontal:10
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    quantityButton: {
        backgroundColor: "#f0f8ff",
        padding: 5,
        borderRadius: 5,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    quantityText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    deliveryInstructionHeading:{
        fontSize:16,
        fontWeight:"600",
    },
    deliveryIconPressable:{
        margin:10,
        borderRadius:10,
        padding:10,
        backgroundColor:"white"
    },
    deliveryInstructionView:{
        justifyContent:"center",
        alignItems:"center",
    },
    deliveryInstructionText:{
        width:75,
        fontSize:13,
        color:"#383838",
        paddingTop:10,
        textAlign:"center"
    },
    outerViewCircleAddMoreItems:{
        flexDirection:"row",
        allignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"white",
        paddingVertical:10,
        paddingHorizontal:10,
    },
    innerViewCircleAddMoreItems:{
        flexDirection:"row",
        allignItems:"center",
        gap:10
    }
});
