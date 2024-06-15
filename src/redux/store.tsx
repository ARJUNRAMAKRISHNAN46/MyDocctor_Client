import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthReducer";
import doctorReducer from "./reducers/DoctorReducer";
import PaymentsReducer from "./reducers/PaymentsReducers";
import AppointmentReducer from "./reducers/AppointmentReducers";
import UserReducer from "./reducers/UserReducers";
import ChatReducer from "./reducers/ChatReducer";

const store = configureStore({
  reducer: {
    authData: authReducer,
    doctorData: doctorReducer,
    paymentData: PaymentsReducer,
    appointmentData: AppointmentReducer,
    userData: UserReducer,
    chatData: ChatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
