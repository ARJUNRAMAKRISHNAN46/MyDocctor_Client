import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../utils/handleErrors";
import { PaymentsAxios } from "../../constants/axiosInstance";

export const listPayments = createAsyncThunk(
  "doctors/payments",
  async (doctorId: string, { rejectWithValue }) => {
    try {
      const { data } = await PaymentsAxios.get(`/list-payments/${doctorId}`);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const listAllPayments = createAsyncThunk(
  "doctors/allPayments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await PaymentsAxios.get(`/list-all-payments`);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
