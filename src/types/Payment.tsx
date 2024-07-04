

export interface PaymentEntity {
    _id: string;
    doctor_id: string;
    date: string;
    user_id: string;
    slot: string;
    fees: number;
    createdAt: Date;
    updatedAt: Date;
  }
  