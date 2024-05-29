import { AppointmentEntity } from "./AddAppoinment";

export interface AvailableShift {
  doctorId: string,
  date: string;
  methods: { method: string; status: boolean }[];
  shifts: {
    shift: string;
    slots: { time: string; status: boolean }[];
  }[];
}



export type ListSlotsProps = {
  slots: AppointmentEntity[];
  selectedDate: string;
};