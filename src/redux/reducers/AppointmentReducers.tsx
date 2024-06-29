import toast from "react-hot-toast";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { userReducerInitial, ErrorPayload } from "../../types/otherTypes";
import {
  addAppointment,
  cancelSlot,
  getSlotById,
  listAllAppoinments,
  listDoctorSlots,
  refundToWallet,
  removeSlot,
} from "../actions/AppointmentActions";

const initialState: userReducerInitial = {
  loading: false,
  err: false,
  role: "",
  user: null,
  message: "",
  status: "",
};

const AppointmentReducer = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<userReducerInitial>) => {
    builder
      .addCase(addAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAppointment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(addAppointment.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(listDoctorSlots.pending, (state) => {
        state.loading = true;
      })
      .addCase(listDoctorSlots.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(listDoctorSlots.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(listAllAppoinments.pending, (state) => {
        state.loading = true;
      })
      .addCase(listAllAppoinments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(listAllAppoinments.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(getSlotById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSlotById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(getSlotById.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(cancelSlot.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelSlot.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(cancelSlot.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(removeSlot.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeSlot.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(removeSlot.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(refundToWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(refundToWallet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(refundToWallet.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
  },
});

export default AppointmentReducer.reducer;
export const { resetMessage } = AppointmentReducer.actions;
