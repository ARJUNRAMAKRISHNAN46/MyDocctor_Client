import { AuthAxios } from "../../constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../util/handleErrors";
import { Login, Signup, UpdatePassword } from "../../types/userData";

export const signupUser = createAsyncThunk(
  "user/userSignup",
  async (userData: Signup, { rejectWithValue }) => {
    console.log("🚀 ~useraction/signup userData:", userData);
    try {
      const { data } = await AuthAxios.post("/signup", {
        ...userData,
        role: "user",
      });
      console.log("return data from background : ", data);

      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'forgot/password', async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.post('/forgotPassword', {email});
      console.log("🚀 ~ 'forgot/password', ~ data:", data)

      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
)

export const signupDoctor = createAsyncThunk(
  "doctor/doctorSignup",
  async (userData: Signup, { rejectWithValue }) => {
    console.log("🚀 ~useraction/signup userData:", userData);
    try {
      const { data } = await AuthAxios.post("/signup", {
        ...userData,
        role: "doctor",
      });

      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const doctorGoogle = createAsyncThunk(
  "doctor/doctorGoogle",
  async (userData: Signup, { rejectWithValue }) => {
    console.log("🚀 ~useraction/signup userData:", userData);
    try {
      const { data } = await AuthAxios.post("/googleSignup", {
        ...userData,
        role: "doctor",
      });

      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updatePassword = createAsyncThunk(
  "update/forgotPassword",
  async (userData: UpdatePassword, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.post("/updatePassword", { ...userData });
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const userGoogle = createAsyncThunk(
  "user/userGoogle",
  async (userData: Signup, { rejectWithValue }) => {
    console.log("🚀 ~useraction/signup userData:", userData);
    try {
      const { data } = await AuthAxios.post("/googleSignup", {
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

export const googleLogin = createAsyncThunk(
  "login/googleLogin",
  async (loginData: Login, { rejectWithValue }) => {
    console.log("🚀 ~ loginData:", loginData);
    try {
      const { data } = await AuthAxios.post("/googleLogin", {
        ...loginData,
      });
      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const LoginUser = createAsyncThunk(
  "user/userLogin",
  async (loginData: Login, { rejectWithValue }) => {
    console.log("🚀 ~ loginData:", loginData);
    try {
      const { data } = await AuthAxios.post("/login", {
        ...loginData,
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
