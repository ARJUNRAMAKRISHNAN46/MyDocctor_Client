import * as Yup from "yup";

export const DoctorDetails = Yup.object({
  name: Yup.string()
    .min(4, "Name must be greater than 3 characters")
    .required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number")
    .required("Please enter your mobile number"),
  dob: Yup.string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
      "Invalid date fomat"
    )
    .required("Please enter your date of birth"),
  gender: Yup.string().required("Select your gender"),
  country: Yup.string().required("Please select a country"),
  state: Yup.string().required("Please select a state"),
  city: Yup.string().required("Please select a city"),
  medicalLicense: Yup.string()
    .matches(/^MD-\d{10}$/, "Please enter a valid medical license number")
    .required("Please enter medical license number"),
  pincode: Yup.string().matches(/^\d{5}(-\d{4})?$/, "Enter a valid pincode").required("Enter your pincode"),
  expertise: ,
  yearsOfExperience: ,
  collageName: ,
  currentWorkingHospital: ,
});
