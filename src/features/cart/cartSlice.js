import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    addItem: (state, { payload }) => {
      console.log(payload);
    },
    clearCart: (state) => {},
    removeItem: (state, { payload }) => {},
    editItem: (state, { payload }) => {},
  },
  clearCart: (state) => {
    localStorage.setItem("cart", JSON.stringify(defaultState));
    return defaultState;
  },
  removeItem: (state, { payload }) => {
    const { cardID } = payload;
    const product = state.cartItems.find((i) => i.cardID === cardID);
    state.cartItems = state.cartItems.filter((i) => i.cardID !== cardID);
    state.numItemsInCart -= product.amount;
    toast.success("Card update");
  },
  editItem: (state, { payload }) => {
    const { cardID, amount } = payload;
    const item = state.cartItems.find((i) => i.cardID === cardID);
    state.numItemsInCart += amount - item.amount;
    state.cartTotal+=item.price+(amount-item.amount)
  },
});
