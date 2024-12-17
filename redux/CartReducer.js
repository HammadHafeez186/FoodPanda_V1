import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    currentHotelId: null,
    discount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, hotel_id } = action.payload;
      if (state.currentHotelId === null) {
        state.currentHotelId = hotel_id;
      }
      if (state.currentHotelId === hotel_id) {
        const existingItem = state.items.find(item => item.id === id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({ id, name, price, quantity: 1, addons: [], hotel_id });
        }
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      if (state.items.length === 0) {
        state.currentHotelId = null;
      }
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity === 1) {
          state.items.splice(itemIndex, 1);
          if (state.items.length === 0) {
            state.currentHotelId = null;
          }
        } else {
          state.items[itemIndex].quantity--;
        }
      }
    },
    resetCart: (state) => {
      state.items = [];
      state.currentHotelId = null;
      state.discount = 0;
    },
    addAddonToItem: (state, action) => {
      const { itemId, addon } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (item && !item.addons.some(existingAddon => existingAddon.id === addon.id)) {
        item.addons.push(addon);
      }
    },
    removeAddonFromItem: (state, action) => {
      const { itemId, addonId } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (item && item.addons) {
        item.addons = item.addons.filter(a => a.id !== addonId);
      }
    },
    updateItemPrice: (state, action) => {
      const { itemId, newPrice } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (item) {
        item.price = newPrice;
      }
    },
    cleanCart: (state) => {
      state.items = [];
      state.currentHotelId = null;
      state.discount = 0;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
  }
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  resetCart,
  addAddonToItem,
  removeAddonFromItem,
  updateItemPrice,
  cleanCart,
  setDiscount,
} = CartSlice.actions;

export default CartSlice.reducer;

