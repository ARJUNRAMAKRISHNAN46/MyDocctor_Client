import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { userReducerInitial, ErrorPayload } from "../../types/otherTypes";
import toast from "react-hot-toast";
import { cancellationMail } from "../actions/NotificationActions";

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
      .addCase(cancellationMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancellationMail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(cancellationMail.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      });
  },
});

export default PaymentReducer.reducer;
export const { resetMessage } = PaymentReducer.actions;
