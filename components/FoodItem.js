import { View, FlatList, Pressable, Text } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from "react";
import MenuItems from "./MenuItems";
import FoodItemStyles from '../Styles/FoodItemStyles';

const FoodItem = ({ item }) => {
    const data = [item];

    // Render function for menu items
    const renderMenuItems = ({ item: menuItem }) => (
        <MenuItems 
            key={menuItem.id || `${item.name}-${menuItem.name}`}
            item={menuItem}
        />
    );

    // Render function for main food item
    const renderFoodItem = ({ item: foodItem }) => (
        <View key={foodItem.id || foodItem.name}>
            <Pressable style={FoodItemStyles.pressableContainer}>
                <Text style={FoodItemStyles.recommendedTagStyle}>
                    {foodItem?.name} ({foodItem.items.length})
                </Text>
                <FontAwesome name="angle-down" size={24} color="black" />
            </Pressable>
            <FlatList
                data={foodItem.items}
                renderItem={renderMenuItems}
                keyExtractor={(menuItem) => menuItem.id || `${foodItem.name}-${menuItem.name}`}
                scrollEnabled={false} // Prevent nested scrolling
            />
        </View>
    );

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderFoodItem}
                keyExtractor={(foodItem) => foodItem.id || foodItem.name}
                scrollEnabled={false} // Prevent nested scrolling
            />
        </View>
    );
};

export default FoodItem;
