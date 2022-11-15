import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  wallet: {
    address: "",
    signer: {},
    provider: {},
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
  },
});

export const { setSigner, setProvider, setAddress } = walletSlice.actions;

const store = configureStore({
  reducer: walletSlice.reducer,
});

export default store;
