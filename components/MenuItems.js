import { Image, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from "../redux/CartReducer";
import MenuItemStyles from "../Styles/MenuItemStyles";

const MenuItems = ({ item }) => {
    const [selected, setSelected] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (!selected) {
            setSelected(true);
            setQuantity(1);
            dispatch(addToCart({ ...item, quantity: 1 }));
        } else {
            setQuantity(prev => prev + 1);
            dispatch(incrementQuantity(item));
        }
    };

    const handleMinusToCart = () => {
        if (quantity === 1) {
            setSelected(false);
            setQuantity(0);
            dispatch(removeFromCart(item));
        } else {
            setQuantity(prev => prev - 1);
            dispatch(decrementQuantity(item));
        }
    };

    return (
        <View>
            <Pressable style={MenuItemStyles.pressableContainer}>
                <View>
                    <Text style={MenuItemStyles.nameText}>{item.name}</Text>
                    <Text style={MenuItemStyles.priceText}>Rs. {item.price}</Text>
                    <Text style={MenuItemStyles.starRatingText}>
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
                    <Text style={MenuItemStyles.itemDescriptionText}>
                        {item.description?.length > 40
                            ? item.description.substring(0, 40) + "..."
                            : item.description || "No Description Available"}
                    </Text>
                </View>
                <Pressable style={MenuItemStyles.pressableImageContainer}>
                    <Image style={MenuItemStyles.imageStyle} source={{ uri: item.image }} />
                    {!selected ? (
                        <Pressable
                            onPress={handleAddToCart}
                            style={MenuItemStyles.pressableButtonContainer}
                        >
                            <Text style={MenuItemStyles.addButtonText}>ADD</Text>
                        </Pressable>
                    ) : (
                        <View style={MenuItemStyles.quantityContainer}>
                            <Pressable
                                onPress={handleMinusToCart}
                                style={MenuItemStyles.quantityButton}
                            >
                                <Text style={MenuItemStyles.quantityButtonText}>-</Text>
                            </Pressable>
                            <Text style={MenuItemStyles.quantityText}>{quantity}</Text>
                            <Pressable
                                onPress={handleAddToCart}
                                style={MenuItemStyles.quantityButton}
                            >
                                <Text style={MenuItemStyles.quantityButtonText}>+</Text>
                            </Pressable>
                        </View>
                    )}
                </Pressable>
            </Pressable>
        </View>
    );
};

export default MenuItems;
