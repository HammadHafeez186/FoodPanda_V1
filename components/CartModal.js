import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/CartReducer';
import { useRouter } from 'expo-router';

const CartModal = ({ isVisible, onClose }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => dispatch(decrementQuantity({ id: item.id, hotel_id: item.hotel_id }))}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => dispatch(incrementQuantity({ id: item.id, hotel_id: item.hotel_id }))}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemPrice}>Rs. {item.price * item.quantity}</Text>
      <TouchableOpacity onPress={() => dispatch(removeFromCart({ id: item.id, hotel_id: item.hotel_id }))}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Your Cart</Text>
          {cart.length > 0 ? (
            <>
              <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
              <Text style={styles.totalPrice}>Total: Rs. {totalPrice}</Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => {
                  onClose();
                  router.push('/Cart');
                }}
              >
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
    elevation: 10, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF2B85',
    textAlign: 'center', // Center the title
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
  },
  itemName: {
    flex: 2,
    color: '#333',
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 22,
    paddingHorizontal: 10,
    color: '#FF2B85',
  },
  quantity: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: '#333',
    fontWeight: '500',
  },
  itemPrice: {
    flex: 1,
    textAlign: 'right',
    color: '#333',
    fontWeight: '600',
  },
  removeButton: {
    color: '#FF2B85',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#FF2B85',
    textAlign: 'center',
  },
  checkoutButton: {
    backgroundColor: '#FF2B85',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FF2B85',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
    color: '#FF2B85',
    fontWeight: '600',
  },
});

export default CartModal;
