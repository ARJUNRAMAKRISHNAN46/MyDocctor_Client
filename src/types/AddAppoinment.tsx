export interface AppointmentEntity {
  date: string;
  consultationMethods: string[];
  slots: {
    start: string;
    end: string;
    userId: string;
  }[];
  doctorId: string;
}
