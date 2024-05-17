import { blockUser, findDoctorById, listDoctor, updateBooking, updateDoctorProfile, verifyDoctor } from "../actions/DoctorActions";
import toast from "react-hot-toast";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { userReducerInitial, ErrorPayload } from "../../types/otherTypes";

const initialState: userReducerInitial = {
  loading: false,
  err: false,
  role: "",
  user: null,
  message: "",
  status: "",
};

const doctorReducer = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<userReducerInitial>) => {
    builder
      .addCase(updateDoctorProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDoctorProfile.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
        toast.success("doctor profile updated successfully", {
          className: "text-center",
        });
      })
      .addCase(updateDoctorProfile.rejected, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(verifyDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyDoctor.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
        toast.success("doctor verified successfully", {
          className: "text-center",
        });
      })
      .addCase(verifyDoctor.rejected, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(listDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(listDoctor.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(listDoctor.rejected, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(findDoctorById.pending, (state) => {
        state.loading = true;
      })
      .addCase(findDoctorById.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(findDoctorById.rejected, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockUser.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(blockUser.rejected, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBooking.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload?.message;
      })
      .addCase(updateBooking.rejected, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
  },
});

export default doctorReducer.reducer;
export const { resetMessage } = doctorReducer.actions;