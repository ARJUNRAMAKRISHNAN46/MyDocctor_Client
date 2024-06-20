import { DoctorAxios } from "../../constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../utils/handleErrors";
import { AvailableShift } from "../../types/slotBooking";
import { profileValues } from "../../pages/doctor/ProfileUpdation";

export const updateDoctorProfile = createAsyncThunk(
  "doctor/updateProfile",
  async (userData: profileValues, { rejectWithValue }) => {
    try {
      const { data } = await DoctorAxios.post("/update-profile", {
        ...userData,
        role: "doctor",
      });

      return data;
    } catch (error) {
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

      return response.data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
