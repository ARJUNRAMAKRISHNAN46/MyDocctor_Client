import { UserAxios } from "../../constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../util/handleErrors";
import { AddSpeciality } from "../../types/userData";

export const addSpeciality = createAsyncThunk(
  "admin/addSpeciality",
  async (specData: AddSpeciality, { rejectWithValue }) => {
    console.log("🚀 ~ data:", specData);
    try {
      const { data } = await UserAxios.post("/addSpeciality", {
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
