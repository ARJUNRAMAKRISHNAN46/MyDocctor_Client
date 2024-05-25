import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppointmentAxios } from "../../constants/axiosInstance";
import { handleErrors } from "../../util/handleErrors";
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
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await AppointmentAxios.get(`/list-doctor-slots/${id}`);
      console.log("🚀 ~ async ~ response:", data);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);