import * as Yup from 'yup';

export const UserEmail = Yup.object({
    email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Invalid email format"
    )
});