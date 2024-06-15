import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrors } from "../../utils/handleErrors";
import { ChatAxios } from "../../constants/axiosInstance";

export const getChats = createAsyncThunk(
  "users/getChats",
  async (ids: { userId: string; doctorId: string }, { rejectWithValue }) => {
    try {
      const { data } = await ChatAxios.post(`/get-chatBy-id/${ids?.doctorId}`, {
        senderId: ids?.userId,
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const sendMessage = createAsyncThunk(
  "user/sendMessage",
  async (ids: { senderId: string, recieverId: string, message: string }, { rejectWithValue }) => {
    try {
      const { data } = await ChatAxios.post(`/send-message/${ids.senderId}`, {
        senderId: ids.recieverId, message: ids.message
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error))
    }
  }
)