import { UserAxios } from "../../constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../utils/handleErrors";
import { AddService, AddSpeciality } from "../../types/userData";
import { UserProfileData } from "../../types/UserProfile";

export const addSpeciality = createAsyncThunk(
  "admin/addSpeciality",
  async (specData: AddSpeciality, { rejectWithValue }) => {
    try {
      const { data } = await UserAxios.post("/add-speciality", {
        ...specData,
        role: "admin",
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const addService = createAsyncThunk(
  "admin/addService",
  async (specData: AddService, { rejectWithValue }) => {
    try {
      const { data } = await UserAxios.post("/add-service", {
        ...specData,
        role: "admin",
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listUsers = createAsyncThunk(
  "user/listUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await UserAxios.get("/list-users");

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

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
