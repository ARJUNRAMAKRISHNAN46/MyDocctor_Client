export interface UserData {
  _id?: string;
  confirmPassword?: string;
  name: string;
  email: string;
  password?: string;
  mobileNumber?: string;
  role?: string;
  isBlocked?: boolean;
  otp: string;
  dob?: string;
  favouriteDoctor?: object[];
  country?: string;
  state?: string;
  city?: string;
  pincode?: string;
  appointments?: object[];
  expertise?: string;
  education?: string;
  languagesKnown?: string[];
  availableShifts?: object[];
  currentWorkingHospital?: string;
  gender?: string;
  collegeName?: string;
  yearsOfExperience?: string;
  workingDays?: string[];
  medicalLicenseNumber?: string;
  experienceCertificate?: string;
  profilePhoto?: string;
  medicalLicense?: string;
  isVerified?: boolean;
  createdAt?: Date;
  isProfile?: boolean;
  updatedAt?: Date;
  isActive?: boolean;
  qualification?: string;
  calendlyLink?: string;
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
  otp?: string;
  role?: string;
};

export type UpdatePassword = {
  email: string;
  password: string;
};

export type AddSpeciality = {
  _id: string;
  specialtyName: string;
  specialtyImage: string;
  specialtyDescription: string;
};

export type AddService = {
  _id?: string;
  serviceName: string;
  serviceImage: string;
  serviceDescription: string;
};