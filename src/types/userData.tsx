enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

export interface UserData {
  confirmPassword?: string;
  name: string,
  email: string,
  password?: string,
  mobileNumber?: string,
  role?: string,
  isBlocked?: boolean,
  otp: string;
  dob?: string,
  favouriteDoctor?: object[],
  country?: string;
  state?: string;
  city?: string;
  pincode?: string;
  appointments?: object[],
  expertise?: string;
  education?: string;
  dateOfBirth?: string;
  languagesKnown?: string[];
  currentWorkingHospital?: string;
  gender?: Gender;
  collegeName?: string;
  yearsOfExperience?: number;
  workingDays?: string[];
  medicalLicenseNumber?: string;
  experienceCertificate: string;
  profilePhoto?: string;
  medicalLicense: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}
export type Login = {
  email: string;
  password: string;
  // role: string
};

export type Signup = {
  name?: string;
  email: string;
  mobileNumber?: string;
  password: string;
  confirmPassword?: string;
};

export type UpdatePassword = {
  email: string,
  password: string
}