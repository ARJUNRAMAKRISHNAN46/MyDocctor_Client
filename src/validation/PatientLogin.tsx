import * as Yup from 'yup';

export const PatientLoginValidation = Yup.object({
    email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Invalid email format"
    ),
    password: Yup.string().required('Please enter your password')
})