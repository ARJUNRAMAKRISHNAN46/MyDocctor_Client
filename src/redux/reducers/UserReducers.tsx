import { addSpeciality, listSpeciality, listUsers } from "../actions/UserActions";
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
      })
      .addCase(listUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(listUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload.message;
        toast.success("user listed successfully", {
          className: "text-center",
        });
      })
      .addCase(listUsers.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
      .addCase(listSpeciality.pending, (state) => {
        state.loading = true;
      })
      .addCase(listSpeciality.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload.message;
        toast.success("speciality listed successfully", {
          className: "text-center",
        });
      })
      .addCase(listSpeciality.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.user = null;
      })
  },
});

export default userReducer.reducer;
export const { resetMessage } = userReducer.actions;
