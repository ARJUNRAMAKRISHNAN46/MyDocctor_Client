import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthReducer";
import doctorReducer from "./reducers/DoctorReducer";
import PaymentsReducer from "./reducers/PaymentsReducers";
import AppointmentReducer from "./reducers/AppointmentReducers";
import UserReducer from "./reducers/UserReducers";

const store = configureStore({
  reducer: {
    authData: authReducer,
    doctorData: doctorReducer,
    paymentData: PaymentsReducer,
    appointmentData: AppointmentReducer,
    userData: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
