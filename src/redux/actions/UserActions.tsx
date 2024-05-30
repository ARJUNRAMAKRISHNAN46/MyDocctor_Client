import { UserAxios } from "../../constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../util/handleErrors";
import { AddService, AddSpeciality } from "../../types/userData";
import { UserProfileData } from "../../types/UserProfile";

export const addSpeciality = createAsyncThunk(
  "admin/addSpeciality",
  async (specData: AddSpeciality, { rejectWithValue }) => {
    console.log("🚀 ~ data:", specData);
    try {
      const { data } = await UserAxios.post("/add-speciality", {
        ...specData,
        role: "admin",
      });
      console.log("🚀 ~ data:", data);
      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const addService = createAsyncThunk(
  "admin/addService",
  async (specData: AddService, { rejectWithValue }) => {
    console.log("🚀 ~ data:", specData);
    try {
      const { data } = await UserAxios.post("/add-service", {
        ...specData,
        role: "admin",
      });
      console.log("🚀 ~ data:", data);
      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listUsers = createAsyncThunk(
  "user/listUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await UserAxios.get("/list-users");
      console.log("🚀 ~ async ~ data:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listSpeciality = createAsyncThunk(
  "admin/listSpeciality",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await UserAxios.get("/list-speciality");
      console.log("🚀 ~ async ~ data:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listService = createAsyncThunk(
  "admin/listService",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await UserAxios.get("/list-services");
      console.log("🚀 ~ async ~ data:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData: UserProfileData, { rejectWithValue }) => {
    try {
      const { data } = await UserAxios.post("/update-profile", { ...userData });
      console.log("🚀 ~ async ~ data:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
