import { createSlice } from "@reduxjs/toolkit";
//Cart Item schema {id, name, price, quantity}

//Different Selection of items {prod: addons}
//Present in the cart
export const CartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const itemPresent = state.find((item) => item.id === action.payload.id);
            if (itemPresent) {
                itemPresent.quantity += action.payload.quantity; //Save to orderItem
            } else {
                state.push({ ...action.payload });
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
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, cleanCart } = CartSlice.actions;
export default CartSlice.reducer;