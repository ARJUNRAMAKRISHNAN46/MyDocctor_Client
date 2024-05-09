import { addSpeciality } from "../actions/AdminActions";
import toast from "react-hot-toast";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { userReducerInitial, ErrorPayload } from "../../types/otherTypes";

const initialState: userReducerInitial = {
  loading: false,
  err: false,
  role: "",
  user: null,
  message: "",
  status: "",
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<userReducerInitial>) => {
    builder
      .addCase(addSpeciality.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSpeciality.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload.message;
        toast.success("Speciality added successfully", {
          className: "text-center",
        });
      })
      .addCase(addSpeciality.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      });
  },
});

export default userReducer.reducer;
export const { resetMessage } = userReducer.actions;
