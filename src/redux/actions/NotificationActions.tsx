import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../utils/handleErrors";
import { NotificationAxios } from "../../constants/axiosInstance";
import { NotificationData } from "../../types/Notification";

export const cancellationMail = createAsyncThunk(
  "doctor/cancellationMail",
  async (notificationData: NotificationData, { rejectWithValue }) => {
    try {
      const { data } = await NotificationAxios.post(
        `/mail/cancel-appointment`,
        notificationData
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
