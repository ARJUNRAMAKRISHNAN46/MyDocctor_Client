export interface AppointmentEntity {
  _id: string;
  date: string;
  consultationMethods: string[];
  slots: {
    start: string;
    userId: string;
  }[];
  doctorId: string;
}

