import * as Yup from "yup";

export const DoctorDetails = Yup.object({
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number")
    .required("Please enter your mobile number"),
  dob: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .required("Please enter your date of birth"),
  gender: Yup.string().required("Select your gender"),
  country: Yup.string().required("Please select a country"),
  state: Yup.string().required("Please select a state"),
  city: Yup.string().required("Please select a city"),
  pincode: Yup.string()
    .matches(/^\d{6}(-\d{4})?$/, "Enter a valid pincode")
    .required("Enter your pincode"),
  expertise: Yup.string().required("Please select expertise"),
  medicalLicenseNumber: Yup.string()
    .matches(/^MD-\d{10}$/, "Please enter a valid medical license number")
    .required("Please enter medical license number"),
  yearsOfExperience: Yup.number().required("Enter your year of experience"),
  collegeName: Yup.string().min(10).required("Please enter your collage name"),
  currentWorkingHospital: Yup.string()
    .min(10)
    .required("Please enter the current working hospital name"),
  profilePhoto: Yup.mixed().required("Please upload your profile photo"),
  experienceCertificate: Yup.mixed().required(
    "Please upload your experience certificate"
  ),
  medicalLicense: Yup.mixed().required("Please upload your medical license"),
});
