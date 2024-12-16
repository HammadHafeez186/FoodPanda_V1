import React, { memo } from "react";
import { Image, Pressable, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import menuItemStyles from "../../FoodPanda_V1/Styles/HotelPageStyles";


const MenuItems = memo(({ item, onAddToCart, onQuantityChange, quantity }) => {
    return (
        <View>
            <View style={menuItemStyles.pressableContainer}>
                <View>
                    <Text style={menuItemStyles.nameText}>{item.name}</Text>
                    <Text style={menuItemStyles.priceText}>Rs. {item.price}</Text>
                    <Text style={menuItemStyles.starRatingText}>
                        {[0, 0, 0, 0, 0].map((_, i) => (
                            <FontAwesome
                                key={i}
                                style={{ paddingHorizontal: 3 }}
                                name={i < Math.floor(item.rating) ? "star" : "star-o"}
                                size={15}
                                color="#ffd700"
                            />
                        ))}
                    </Text>
                    <Text style={menuItemStyles.itemDescriptionText}>
                        {item.description?.length > 40
                            ? item.description.substring(0, 40) + "..."
                            : item.description || "No Description Available"}
                    </Text>
                </View>
                <View style={menuItemStyles.pressableImageContainer}>
                    <Image style={menuItemStyles.imageStyle} source={{ uri: item.image }} />
                    {quantity === 0 ? (
                        <TouchableOpacity
                            onPress={() => onAddToCart(item)}
                            style={menuItemStyles.pressableButtonContainer}
                        >
                            <Text style={menuItemStyles.addButtonText}>ADD</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={menuItemStyles.quantityContainer}>
                            <TouchableOpacity
                                onPress={() => onQuantityChange('decrement')}
                                style={menuItemStyles.quantityButton}
                            >
                                <Text style={menuItemStyles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={menuItemStyles.quantityText}>{quantity}</Text>
                            <TouchableOpacity
                                onPress={() => onQuantityChange('increment')}
                                style={menuItemStyles.quantityButton}
                            >
                                <Text style={menuItemStyles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
});

export default MenuItems;

