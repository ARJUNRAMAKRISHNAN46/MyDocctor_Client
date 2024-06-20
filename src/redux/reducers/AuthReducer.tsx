import {
  signupUser,
  LoginUser,
  LogoutUser,
  getUser,
  signupDoctor,
  doctorGoogle,
  userGoogle,
  googleLogin,
  updatePassword,
  forgotPassword,
} from "../actions/AuthActions";
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

const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<userReducerInitial>) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload.message;
        toast.success("An OTP has been sent to user email", {
          className: "text-center",
        });
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(signupDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupDoctor.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload.message;
        toast.success("An OTP has been sent to user email", {
          className: "text-center",
        });
      })
      .addCase(signupDoctor.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload.message;
        toast.success("An OTP has been sent to user email", {
          className: "text-center",
        });
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(doctorGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(doctorGoogle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload.message;
        toast.success("An OTP has been sent to user email", {
          className: "text-center",
        });
      })
      .addCase(doctorGoogle.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload.message;
        toast.success("An OTP has been sent to user email", {
          className: "text-center",
        });
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(userGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(userGoogle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload.message;
        toast.success("An OTP has been sent to user email", {
          className: "text-center",
        });
      })
      .addCase(userGoogle.rejected, (state, { payload }) => {
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
        state.user = payload?.data;
        console.log(state.user, "\\\\\\\\\\")
      })
      .addCase(LoginUser.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.role = payload?.role;
        if (payload) {
          toast.success("Login successful !!!");
        }
        state.user = payload?.data;
      })
      .addCase(googleLogin.rejected, (state, { payload }) => {
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
        state.loading = false;
        state.user = payload?.data;
      })
      .addCase(LogoutUser.rejected, (state, { payload }) => {
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
        state.loading = false;
        state.user = payload?.data;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload?.message;
        state.user = null;
      });
  },
});

export default authReducer.reducer;
export const { resetMessage } = authReducer.actions;
