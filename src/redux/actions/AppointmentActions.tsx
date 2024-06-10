import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppointmentAxios } from "../../constants/axiosInstance";
import { handleErrors } from "../../utils/handleErrors";
import { AppointmentEntity } from "../../types/AddAppoinment";

export const addAppointment = createAsyncThunk(
  "doctor/addAppointment",
  async (appointmentData: AppointmentEntity, { rejectWithValue }) => {
    try {
      const { data } = await AppointmentAxios.post("/create-appointment", {
        appointmentData,
      });
      console.log("🚀 ~ async ~ response:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listDoctorSlots = createAsyncThunk(
  "doctor/listDoctorSlots",
  async (
    { id, selectedDate }: { id: string; selectedDate: string },
    { rejectWithValue }
  ) => {
    console.log("🚀 ~ id:", id);
    try {
      const { data } = await AppointmentAxios.get(`/list-doctor-slots/${id}`, {
        params: { date: selectedDate },
      });
      console.log("🚀 ~ async ~ response:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listDoctorAppoinments = createAsyncThunk(
  "doctor/listDoctorSlots",
  async (id: string, { rejectWithValue }) => {
    console.log("🚀 ~ id:", id);
    try {
      const { data } = await AppointmentAxios.get(`/list-slots/${id}`);
      console.log("🚀 ~ async ~ response:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listUserForSideBar = createAsyncThunk(
  "user/listUserForSideBar",
  async (id: string, { rejectWithValue }) => {
    console.log("🚀 ~ id:", id);
    try {
      const { data } = await AppointmentAxios.get(`/list-users/${id}`);
      console.log("🚀 ~ async ~ response:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listDoctorsForSideBar = createAsyncThunk(
  "user/listDoctorsForSideBar",
  async (id: string, { rejectWithValue }) => {
    console.log("🚀 ~ id:", id);
    try {
      const { data } = await AppointmentAxios.get(`/list-doctors/${id}`);
      console.log("🚀 ~ async ~ response:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listUserAppoinments = createAsyncThunk(
  "user/listUserAppoinment",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await AppointmentAxios.get(`/list-user-appointments/${id}`);
      console.log("🚀 ~ async ~ response:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

