import React, { memo } from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import styles from "../Styles/MenuItemStyles";

const MenuItem = memo(({ item, onAddToCart, onQuantityChange, quantity, discountPercentage }) => {
  const discountedPrice = (item.price * (1 - discountPercentage / 100)).toFixed(2);
  
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.priceContainer}>
            {discountPercentage > 0 ? (
              <>
                <Text style={styles.originalPrice}>Rs. {item.price}</Text>
                <Text style={styles.discountedPrice}>Rs. {discountedPrice}</Text>
              </>
            ) : (
              <Text style={styles.discountedPrice}>Rs. {item.price}</Text>
            )}
          </View>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesome
                key={star}
                name={star <= Math.floor(item.rating) ? "star" : "star-o"}
                size={16}
                color="#FFD700"
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <Image 
          source={{ uri: item.image }}
          style={styles.itemImage}
        />
      </View>
      {quantity === 0 ? (
        <TouchableOpacity
          onPress={() => onAddToCart(item)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => onQuantityChange(item, 'decrement')}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => onQuantityChange(item, 'increment')}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

export default MenuItem;

