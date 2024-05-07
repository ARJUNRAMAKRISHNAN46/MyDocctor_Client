import * as Yup from "yup";

export const UserSignupValidation = Yup.object({
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
  password: Yup.string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "8 characters,uppercase letter,lowercase letter,number,special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  otp: Yup.string(),
});
