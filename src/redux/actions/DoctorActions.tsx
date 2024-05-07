import { DoctorAxios } from "../../constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../util/handleErrors";
import { UserData } from "../../types/userData";

export const updateDoctorProfile = createAsyncThunk(
  "doctor/updateProfile",
  async (userData: UserData, { rejectWithValue }) => {
    console.log("🚀 ~ userData:", userData);
    try {
      const { data } = await DoctorAxios.put("/doctors/update-profile", {
        ...userData,
        role: "doctor",
      });
      console.log("🚀 ~ data:", data);

      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      return rejectWithValue(handleErrors(error));
    }
  }
);
