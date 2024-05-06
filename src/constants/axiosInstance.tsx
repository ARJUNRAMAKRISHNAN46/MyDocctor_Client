import axios from "axios";
export const authbaseUrl = String(
  import.meta.env.VITE_AUTHENTICATION_SERVICE_URI
);
export const doctorbaseUrl = String(import.meta.env.VITE_DOCTOR_SERVICE_URI);

export const AuthAxios = axios.create({
  baseURL: authbaseUrl,
  withCredentials: true,
});

export const DoctorAxios = axios.create({
  baseURL: doctorbaseUrl,
  withCredentials: true,
});
