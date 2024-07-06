export interface AppointmentEntity {
  _id?: string;
  date: string;
  consultationMethods: string[];
  slots: {
    _id?: string;
    start: string;
    userId?: string;
  }[];
  doctorId: string;
}
