import * as Yup from 'yup';

export const UserLoginValidation = Yup.object({
    email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Invalid email format"
    ),
    password: Yup.string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Invalid password"
    ),
})