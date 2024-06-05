export interface PaymentEntity {
    _id: Key | null | undefined;
    doctor_id: string;
    date: string;
    user_id: string;
    slot: string;
    fees: number;
    createdAt: Date;
    updatedAt: Date;
  }
  