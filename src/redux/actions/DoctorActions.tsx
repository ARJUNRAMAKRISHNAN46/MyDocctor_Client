import { DoctorAxios } from "../../constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../util/handleErrors";
import { UserData } from "../../types/userData";
import { AvailableShift } from "../../types/slotBooking";

export const updateDoctorProfile = createAsyncThunk(
  "doctor/updateProfile",
  async (userData: UserData, { rejectWithValue }) => {
    console.log("🚀 ~ userData:", userData);
    try {
      const { data } = await DoctorAxios.post("/update-profile", {
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

export const verifyDoctor = createAsyncThunk(
  "doctor/verifyDoctor",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await DoctorAxios.get("/verify-doctor", {
        params: { email },
      });
      console.log("🚀 ~ async ~ data:", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listDoctor = createAsyncThunk(
  "doctor/listDoctor",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await DoctorAxios.get("/list-doctor");
      console.log("🚀 ~ data:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const findDoctorById = createAsyncThunk(
  "doctor/findDoctorById",
  async (id: string, { rejectWithValue }) => {
    console.log("🚀 ~ id:", id)
    try {
      const { data } = await DoctorAxios.get(`/find-doctor/${id}`);
      console.log("🚀 ~ async ~ data:", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateBooking = createAsyncThunk(
  "doctor/updateBooking",
  async (availableShift: AvailableShift, { rejectWithValue }) => {
    try {
      const { data } = await DoctorAxios.put(`/update-booking/${availableShift?.doctorId}`, availableShift);
      console.log("🚀 ~ async ~ data:", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const blockUser = createAsyncThunk(
  "doctor/blockUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await DoctorAxios.get(`/block-user/${id}`);
      console.log("🚀 ~ async ~ data:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const addAppointmentLink = createAsyncThunk(
  'doctor/addLink',
  async (linkData: { id: string, link: string }, { rejectWithValue }) => {
    try {
      const response = await DoctorAxios.post(`/add-link/${linkData.id}`, { link: linkData.link });
      console.log('🚀 ~ async ~ response:', response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
