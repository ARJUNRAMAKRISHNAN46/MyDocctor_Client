import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/AuthReducer';
import DoctorReducer from './reducers/DoctorReducer';

const store = configureStore({
    reducer: {
        userData: userReducer,
        doctorData: DoctorReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;