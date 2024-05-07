import { updateDoctorProfile } from "../actions/DoctorActions";
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
      });
  },
});

export default doctorReducer.reducer;
export const { resetMessage } = doctorReducer.actions;