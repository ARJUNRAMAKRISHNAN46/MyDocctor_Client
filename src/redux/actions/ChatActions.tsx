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
  async (ids: { senderId: string, recieverId: string, message: string, type: string }, { rejectWithValue }) => {
    try {
      const { data } = await ChatAxios.post(`/send-message/${ids.recieverId}`, {
        senderId: ids.senderId, message: ids.message, type: ids.type
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error))
    }
  }
)

export const getPrescriptions = createAsyncThunk(
  "user/getPrescriptions",
  async ( recieverId: string, { rejectWithValue }) => {
    try {
      const { data } = await ChatAxios.get(`/get-prescriptions/${recieverId}`);

      return data;
    } catch (error: any) {
      return rejectWithValue(handleErrors(error))
    }
  }
)