export interface AppointmentEntity {
  _id: string;
  date: string;
  consultationMethods: string[];
  slots: {
    start: string;
    end: string;
    userId: string;
  }[];
  doctorId: string;
}
