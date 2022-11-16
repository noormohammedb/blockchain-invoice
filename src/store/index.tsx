import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  wallet: {
    address: "",
    signer: {},
    provider: {},
    invoice: Array(),
    totalInvoices: 0,
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
  },
});

export const {
  setSigner,
  setProvider,
  setAddress,
  setNewInvoice,
  incrementTotalInvoices,
} = walletSlice.actions;

const store = configureStore({
  reducer: walletSlice.reducer,
});

export default store;
