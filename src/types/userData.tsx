export interface UserData {
  confirmPassword: string;
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  role: string;
  profile: {
    avatar: {
      type: string;
    };
    dob: {
      type: string;
    };
    gender: {
      type: string;
      enum: ["male", "female", "other"];
    };
  };
  isBlocked: boolean;
  otp: string;
  favouriteDoctor: string[];
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  }[];
  appointments: string[];
}

export type Login = {
  email: string;
  password: string;
  role: "user" | "admin" | "doctor";
};

export type Signup = {
  name?: string;
  email: string;
  mobileNumber?: string;
  password: string;
  confirmPassword?: string;
};
