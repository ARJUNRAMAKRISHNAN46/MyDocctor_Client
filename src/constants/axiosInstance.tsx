import axios from "axios";
export const authbaseUrl = String(
  import.meta.env.VITE_AUTHENTICATION_SERVICE_URI
);
export const doctorbaseUrl = String(import.meta.env.VITE_DOCTOR_SERVICE_URI);
export const userbaseUrl = String(import.meta.env.VITE_USER_SERVICE_URI);
export const adminbaseUrl = String(import.meta.env.VITE_ADMIN_SERVICE_URI);
export const appointmentUrl = String(
  import.meta.env.VITE_APPOINTMENT_SERVICE_URI
);
export const paymentsUrl = String(import.meta.env.VITE_PAYMENTS_SERVICE_URI);
export const chatUrl = String(import.meta.env.VITE_CHAT_SERVICE_URI);
export const NotificationUrl = String(import.meta.env.VITE_NOTIFICATION_SERVICE_URI);

export const AuthAxios = axios.create({
  baseURL: authbaseUrl,
  withCredentials: true,
});

export const DoctorAxios = axios.create({
  baseURL: doctorbaseUrl,
  withCredentials: true,
});

export const UserAxios = axios.create({
  baseURL: userbaseUrl,
  withCredentials: true,
});

export const AdminAxios = axios.create({
  baseURL: adminbaseUrl,
  withCredentials: true,
});

export const AppointmentAxios = axios.create({
  baseURL: appointmentUrl,
  withCredentials: true,
});

export const PaymentsAxios = axios.create({
  baseURL: paymentsUrl,
  withCredentials: true,
});

export const ChatAxios = axios.create({
  baseURL: chatUrl,
  withCredentials: true,
});

export const NotificationAxios = axios.create({
  baseURL: NotificationUrl,
  withCredentials: true,
});
