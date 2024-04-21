import { AuthAxios } from "../../constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../util/handleErrors";
import { Login, Signup } from "../../types/userData";

export const signupUser = createAsyncThunk(
  "user/userSignup",
  async (userData: Signup, { rejectWithValue }) => {
    console.log("🚀 ~useraction/signup userData:", userData);
    try {
      
      const { data } = await AuthAxios.post("/signup", {
        ...userData,
        role: "user",
      });

      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.get("/isExist");
      console.log("🚀 ~ getUser ~ data:", data);

      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const LoginUser = createAsyncThunk(
  "user/userLogin",
  async (loginData: Login, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.post("/login", {
        ...loginData,
        role: "user",
      });
      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (
    sendData: { email: string; currentPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await AuthAxios.put("/changePassword", sendData);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const LogoutUser = createAsyncThunk(
  "user/userLogout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.get("/logout");

      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
