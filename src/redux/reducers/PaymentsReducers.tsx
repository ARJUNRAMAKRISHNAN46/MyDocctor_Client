import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { userReducerInitial, ErrorPayload } from "../../types/otherTypes";
import { listPayments } from "../actions/PaymentActions";
import toast from "react-hot-toast";

const initialState: userReducerInitial = {
  loading: false,
  err: false,
  role: "",
  user: null,
  message: "",
  status: "",
};

const PaymentReducer = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<userReducerInitial>) => {
    builder
      .addCase(listPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(listPayments.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(listPayments.rejected, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        console.log("🚀 ~ .addCase ~ errorPayload:", errorPayload);
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      });
  },
});

export default PaymentReducer.reducer;
export const { resetMessage } = PaymentReducer.actions;
