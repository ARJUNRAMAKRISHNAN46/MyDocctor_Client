import {
  //   getUser,
  signupUser,
  LoginUser,
  //   changePassword,
  LogoutUser,
  getUser,
} from "../actions/UserActions";
import toast from "react-hot-toast";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { UserReducerInitial, ErrorPayload } from "../../types/otherTypes";

const initialState: UserReducerInitial = {
  loading: false,
  err: false,
  role: null,
  user: null,
  message: "",
  status: "",
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserReducerInitial>) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        state.err = false;
        state.user = payload.data;
        state.message = payload.message;
        toast.success("An OTP has been sent to user email", {
          className: "text-center",
        });
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.role = payload?.role;
        if (payload) {
          toast.success("Login successful !!!");
        }
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.user = payload?.data;
      })
      .addCase(LoginUser.rejected, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(LogoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LogoutUser.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        state.user = payload?.user;
        state.role = null;
      })
      .addCase(LogoutUser.rejected, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload?.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        state.user = payload?.data;
        state.role = null;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        console.log("🚀 ~ .addCase ~ payload:", payload);
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload?.message;
        toast.error(errorPayload.message);
        state.user = null;
      });
  },
});

export default userReducer.reducer;
export const { resetMessage } = userReducer.actions;
