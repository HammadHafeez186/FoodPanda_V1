import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import CartModal from './CartModal';

const CartButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="cart" size={30} color="white" />
        <View style={styles.cartBadge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      </TouchableOpacity>
      <CartModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
    cartButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#FF2B85', // Updated to the new color scheme
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    cartBadge: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: '#FF2B85', // Updated to the new color scheme
      borderRadius: 10,
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
    },
  });
  

export default CartButton;

