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
