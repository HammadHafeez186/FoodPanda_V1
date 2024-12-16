import React, { memo } from "react";
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MenuItems from "./MenuItems";

import foodItemStyles from "../../FoodPanda_V1/Styles/HotelPageStyles";

const FoodItem = memo(({ item, onAddToCart, onQuantityChange, cartItems }) => {
    const [expanded, setExpanded] = React.useState(true);

    const renderMenuItems = React.useCallback(({ item: menuItem }) => (
        <MenuItems 
            key={menuItem.id}
            item={menuItem}
            onAddToCart={() => onAddToCart(menuItem)}
            onQuantityChange={(action) => onQuantityChange(menuItem, action)}
            quantity={cartItems.find(cartItem => cartItem.id === menuItem.id)?.quantity || 0}
        />
    ), [onAddToCart, onQuantityChange, cartItems]);

    return (
        <View>
            <Pressable 
                style={foodItemStyles.pressableContainer}
                onPress={() => setExpanded(!expanded)}
            >
                <Text style={foodItemStyles.recommendedTagStyle}>
                    {item.name} ({item.items.length})
                </Text>
                <FontAwesome name={expanded ? "angle-up" : "angle-down"} size={24} color="black" />
            </Pressable>
            {expanded && (
                <FlatList
                    data={item.items}
                    renderItem={renderMenuItems}
                    keyExtractor={(menuItem) => menuItem.id.toString()}
                    scrollEnabled={false}
                />
            )}
        </View>
    );
});

export default FoodItem;

