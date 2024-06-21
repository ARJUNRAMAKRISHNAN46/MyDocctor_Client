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
    try {
      const { data } = await AppointmentAxios.get(`/list-doctor-slots/${id}`, {
        params: { date: selectedDate },
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listDoctorAppoinments = createAsyncThunk(
  "doctor/listDoctorSlots",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await AppointmentAxios.get(`/list-slots/${id}`);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listUserForSideBar = createAsyncThunk(
  "user/listUserForSideBar",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await AppointmentAxios.get(`/list-users/${id}`);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listDoctorsForSideBar = createAsyncThunk(
  "user/listDoctorsForSideBar",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await AppointmentAxios.get(`/list-doctors/${id}`);

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

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listAllAppoinments = createAsyncThunk(
  "admin/listAllAppoinment",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AppointmentAxios.get(`/list-all-appointments`);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
