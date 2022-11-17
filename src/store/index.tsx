import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  wallet: {
    address: "",
    signer: {},
    provider: {},
    invoice: Array(),
    totalInvoices: 0,
    localProducts: Array(),
  },
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setSigner(state, action) {
      state.wallet.signer = action.payload;
    },
    setProvider(state, action) {
      state.wallet.provider = action.payload;
    },
    setAddress(state, action) {
      state.wallet.address = action.payload;
    },
    setNewInvoice(state, action) {
      state.wallet.invoice = action.payload;
    },
    incrementTotalInvoices(state) {
      state.wallet.totalInvoices++;
    },
    addLocalProduct(state, action) {
      state.wallet.localProducts.push(action.payload);
    },
  },
});

export const {
  setSigner,
  setProvider,
  setAddress,
  setNewInvoice,
  incrementTotalInvoices,
  addLocalProduct,
} = walletSlice.actions;

const store = configureStore({
  reducer: walletSlice.reducer,
});

export default store;
