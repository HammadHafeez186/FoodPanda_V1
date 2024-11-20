import { Pressable, FlatList, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import menu from "../../data/MenuData.json";
import FoodItem from "../../components/FoodItem";
import { useSelector } from "react-redux";
import HotelPageStyles from "../../Styles/HotelPageStyles";

const hotelPage = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const cart = useSelector(state => state.cart);

    // Header component to be rendered at the top of FlatList
    const ListHeaderComponent = () => (
        <>
            <View style={HotelPageStyles.arrowContainer}>
                <Ionicons onPress={() => router.back()} style={HotelPageStyles.ionicons} name="arrow-back" size={24} color="black" />
                <View style={HotelPageStyles.threeIconsContainer}>
                    <SimpleLineIcons name="camera" size={24} color="black" />
                    <Ionicons name="bookmark-outline" size={24} color="black" />
                    <Ionicons name="share-outline" size={24} color="black" />
                </View>
            </View>

            <View style={HotelPageStyles.paramsOuterContainer}>
                <Text style={HotelPageStyles.nameText}>{params.name}</Text>
                <Text style={HotelPageStyles.descriptionText}>Pakistani Fast Food</Text>
                <View style={HotelPageStyles.aggregateOuterContainer}>
                    <View style={HotelPageStyles.aggregate_ratingContainer}>
                        <Text style={HotelPageStyles.aggregateText}>{params.aggregate_rating}</Text>
                        <Ionicons name="star" size={15} color="white" />
                    </View>
                    <Text style={HotelPageStyles.ratingTextStyle}>3.2k ratings</Text>
                </View>
                <View style={HotelPageStyles.waitTimeContainer}>
                    <Text>30-40 mins 6km Johar Town</Text>
                </View>
            </View>
        </>
    );

    // Ensure menu items have unique IDs
    const menuWithIds = menu.map((item, index) => ({
        ...item,
        id: item.id || `item-${index}`, // Use existing ID or create one
    }));

    const renderItem = ({ item }) => (
        <FoodItem 
            item={item}
            key={item.uniqueId} // Add key here as well
        />
    );

    return (
        <>
            <FlatList
                data={menuWithIds}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={ListHeaderComponent}
                contentContainerStyle={HotelPageStyles.mainContainer}
                showsVerticalScrollIndicator={false}
            />

            {cart.length > 0 && (
                <Pressable style={HotelPageStyles.cartPressableContainer}>
                    <Text style={HotelPageStyles.cartText}>{cart.length} items added.</Text>
                    <Text style={HotelPageStyles.cartItemsMin}>Add item(s) worth Rs.500 to place Order</Text>
                </Pressable>
            )}
        </>
    );
}

export default hotelPage;
