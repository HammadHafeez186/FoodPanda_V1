import { createSlice } from "@reduxjs/toolkit";

// Cart Item schema: { id, name, price, quantity, addons: [] }
// Addons structure: { id, name, price }

export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        itemPresent.quantity += action.payload.quantity; // Add quantity if already exists
      } else {
        state.push({ ...action.payload, addons: [] }); // Initialize addons as an empty array
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      const itemPresent = state.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        itemPresent.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const itemPresent = state.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        if (itemPresent.quantity === 1) {
          return state.filter((item) => item.id !== action.payload.id);
        } else {
          itemPresent.quantity--;
        }
      }
    },
    cleanCart: () => {
      return [];
    },
    addAddonToItem: (state, action) => {
      const { itemId, addon } = action.payload;
      const item = state.find((item) => item.id === itemId);
      if (item) {
        const addonExists = item.addons.find((addonItem) => addonItem.id === addon.id);
        if (!addonExists) {
          item.addons.push(addon);
        }
      }
    },
    removeAddonFromItem: (state, action) => {
      const { itemId, addon } = action.payload;
      const item = state.find((item) => item.id === itemId);
      if (item) {
        item.addons = item.addons.filter((addonItem) => addonItem.id !== addon.id);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
  addAddonToItem,
  removeAddonFromItem,
} = CartSlice.actions;

export default CartSlice.reducer;
