import * as Yup from "yup";

export const UserProfileValidation = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  dob: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .required("Please enter your date of birth"),
  country: Yup.string()
    .required("Country is required")
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must be at most 50 characters"),
  state: Yup.string()
    .required("State is required")
    .min(2, "State must be at least 2 characters")
    .max(50, "State must be at most 50 characters"),
  city: Yup.string()
    .required("City is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be at most 50 characters"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[0-9]{5,6}$/, "Pincode must be 5 or 6 digits"),
  profilePhoto: Yup.mixed().required("Please upload your profile photo"),
});
