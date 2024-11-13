import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {FontAwesome} from '@expo/vector-icons';
import {useDispatch} from "react-redux";
import {addToCart, decrementQuantity, incrementQuantity, removeFromCart} from "../redux/CartReducer";

const MenuItems = ({item}) => {
    const [selected, setSelected] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (!selected) {
            setSelected(true);
            setQuantity(1);
            dispatch(addToCart({...item, quantity: 1}));
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
            <Pressable style={styles.pressableContainer}>
                <View>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.priceText}>Rs. {item.price}</Text>
                    <Text style={styles.starRatingText}>
                        {[0, 0, 0, 0, 0].map((_, i) => (
                            <FontAwesome
                                key={i}
                                style={{paddingHorizontal: 3}}
                                name={i < Math.floor(item.rating) ? "star" : "star-o"}
                                size={15}
                                color="#ffd700"
                            />
                        ))}
                    </Text>
                    <Text style={styles.itemDescriptionText}>
                        {item.description?.length > 40
                            ? item.description.substring(0, 40) + "..."
                            : item.description || "No Description Available"}
                    </Text>

                </View>
                <Pressable style={styles.pressableImageContainer}>
                    <Image style={styles.imageStyle} source={{uri: item.image}}/>
                    {!selected ? (
                        <Pressable
                            onPress={handleAddToCart}
                            style={styles.pressableButtonContainer}
                        >
                            <Text style={styles.addButtonText}>ADD</Text>
                        </Pressable>
                    ) : (
                        <View style={styles.quantityContainer}>
                            <Pressable
                                onPress={handleMinusToCart}
                                style={styles.quantityButton}
                            >
                                <Text style={styles.quantityButtonText}>-</Text>
                            </Pressable>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <Pressable
                                onPress={handleAddToCart}
                                style={styles.quantityButton}
                            >
                                <Text style={styles.quantityButtonText}>+</Text>
                            </Pressable>
                        </View>
                    )}
                </Pressable>
            </Pressable>
        </View>
    );
};

export default MenuItems;

const styles = StyleSheet.create({
    starRatingText: {
        marginTop: 5,
        borderRadius: 4,
    },
    pressableContainer: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15
    },
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },
    itemDescriptionText: {
        width: 200,
        marginTop: 8,
        color: "gray",
        fontSize: 16,
    },
    nameText: {
        fontSize: 18,
        fontWeight: "600",
        width: 220,
    },
    priceText: {
        marginTop: 4,
        fontSize: 15,
        fontWeight: "500",
    },
    pressableImageContainer: {
        marginRight: 10,
    },
    pressableButtonContainer: {
        position: "absolute",
        top: 95,
        left: 20,
        borderColor: "#a32636",
        borderWidth: 1,
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingVertical: 5,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fd5c63"
    },
    quantityContainer: {
        position: "absolute",
        top: 95,
        left: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fd5c63",
        borderRadius: 5,
        borderColor: "#a32636",
        borderWidth: 1,
    },
    quantityButton: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
    },
    quantityText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        paddingHorizontal: 10,
    }
});