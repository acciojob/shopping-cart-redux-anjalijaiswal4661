import { configureStore, createSlice } from "@reduxjs/toolkit";

const products = [
  { id: 1, name: "iPhone 15", price: 800 },
  { id: 2, name: "Samsung S24", price: 700 },
  { id: 3, name: "Pixel 9", price: 650 },
];

const cartSlice = createSlice({
  name: "shop",
  initialState: {
    products,
    cart: [],
    wishlist: [],
    discount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i.id !== action.payload);
    },

    increaseQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);

      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter((i) => i.id !== action.payload);
      }
    },

    toggleWishlist: (state, action) => {
      const exists = state.wishlist.find((i) => i.id === action.payload.id);

      if (exists) {
        state.wishlist = state.wishlist.filter(
          (i) => i.id !== action.payload.id
        );
      } else {
        state.wishlist.push(action.payload);
      }
    },

    applyCoupon: (state, action) => {
      const code = action.payload.trim().toUpperCase();

      if (code === "SAVE10") state.discount = 10;
      else if (code === "SAVE20") state.discount = 20;
      else state.discount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  toggleWishlist,
  applyCoupon,
} = cartSlice.actions;

export const store = configureStore({
  reducer: {
    shop: cartSlice.reducer,
  },
});