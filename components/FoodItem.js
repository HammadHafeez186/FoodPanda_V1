import React, { memo } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import MenuItems from "./MenuItems";
import styles from "../Styles/FoodItemStyles";

const FoodItem = memo(({ item, onAddToCart, onQuantityChange, cartItems, discountPercentage }) => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.categoryHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.categoryTitle}>
          {item.name} <Text style={styles.itemCount}>({item.items.length})</Text>
        </Text>
        <FontAwesome 
          name={expanded ? "angle-up" : "angle-down"} 
          size={20} 
          color="#333" 
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.menuItemsContainer}>
          {item.items.map((menuItem) => (
            <MenuItems 
              key={menuItem.id}
              item={menuItem}
              onAddToCart={() => onAddToCart(menuItem)}
              onQuantityChange={(action) => onQuantityChange(menuItem, action)}
              quantity={cartItems.find(cartItem => cartItem.id === menuItem.id)?.quantity || 0}
              discountPercentage={discountPercentage > 0 ? discountPercentage : 0}
            />
          ))}
        </View>
      )}
    </View>
  );
});

export default FoodItem;

