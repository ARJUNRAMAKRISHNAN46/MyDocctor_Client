import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { UserSignupValidation } from "../validation/UserSignup";
import { FormikProps } from "formik";
import OtpInput from "./OtpInput";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/actions/UserActions";

const initialValues = {
  name: "",
  email: "",
  mobileNumber: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

interface FormValues {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

function SignupComp() {
  const [status, setStatus] = useState<boolean>(false);
  const [data, setData] = useState<FormValues | null>(null);
  const [emailExists, setEmailExists] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (values: FormValues) => {
    try {
      setData(values);

      dispatch(signupUser(values))
        .then((res) => {
          console.log("🚀 ~ .then ~ res~~~~~~~~~~~~~~~~~~~~~:", res);

          if (res.type.endsWith("fulfilled")) {
            setStatus(true);
          }
          if (res.type.endsWith("rejected")) {
            setEmailExists(true);
          }
          setTimeout(() => {
            setEmailExists(false);
          }, 3000);
        })
        .catch((err) => {
          console.log(err, " 909o0");
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      if (error?.response && error?.response.status === 409) {
        setEmailExists(true);
        console.log("Error:", error);
      }
    }
  };

  return (
    <>
      {emailExists && (
        <div className="bg-red-500 text-white text-center py-2">
          Email already exists
        </div>
      )}
      {console.log(status, "--------------------------------status")}
      {!status ? (
        <div className="md:flex grid-flow-row">
          <div className="md:w-[50%] mt-16 bg-white items-center hidden md:block">
            <img src="../../src/assets/patient-login.jpg" alt="login-image" />
          </div>
          <div className=" md:w-[50%] p-3 md:p-0 bg-gray-800">
            <div
              className="flex justify-center pt-8
              "
            >
              <h1 className="text-red-600 font-bold text-[28px] md:text-[40px]">
                My
              </h1>
              <h1 className="text-white font-bold text-[28px] md:text-[40px]">
                Doctor
              </h1>
            </div>
            <div className="text-center mt-4 text-white font-semibold">
              <h1 className="md:text-2xl font-bold">REGISTER HERE</h1>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={UserSignupValidation}
              onSubmit={handleSubmit}
            >
              {(formikProps: FormikProps<FormValues>) => (
                <Form>
                  <div className="flex justify-center mt-12 md:mt-8">
                    <Field
                      style={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #8ca1be",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "white",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="text"
                      name="name"
                      placeholder="Enter your first name"
                    ></Field>
                  </div>
                  <div className="md:ml-48">
                    {formikProps.errors.name && formikProps.touched.name && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.name}
                      </small>
                    )}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Field
                      style={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #8ca1be",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "white",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                    ></Field>
                  </div>
                  <div className="md:ml-48">
                    {formikProps.errors.email && formikProps.touched.email && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.email}
                      </small>
                    )}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Field
                      style={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #8ca1be",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "white",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="tel"
                      name="mobileNumber"
                      placeholder="Enter your mobile number"
                    ></Field>
                  </div>
                  <div className="md:ml-48">
                    {formikProps.errors.mobileNumber &&
                      formikProps.touched.mobileNumber && (
                        <small className="text-red-600 text-center">
                          {formikProps.errors.mobileNumber}
                        </small>
                      )}
                  </div>
                  <div className="flex justify-center mt-4 ">
                    <Field
                      style={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #8ca1be",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "white",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                    ></Field>
                  </div>
                  <div className="md:ml-48">
                    {formikProps.errors.password &&
                      formikProps.touched.password && (
                        <small className="text-red-600 text-center">
                          {formikProps.errors.password}
                        </small>
                      )}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Field
                      style={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #8ca1be",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "white",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-Enter your password"
                    ></Field>
                  </div>
                  <div className="md:ml-48">
                    {formikProps.errors.confirmPassword &&
                      formikProps.touched.confirmPassword && (
                        <small className="text-red-600 text-center">
                          {formikProps.errors.confirmPassword}
                        </small>
                      )}
                  </div>
                  <Field type="hidden" name="otp" />
                  <div className="text-gray-300 text-[10px] md:text-[15px] text-center mt-16 md:mt-8">
                    <a href="/login">Already a member ? Login now</a>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      className="text-white font-bold md:mb-32 mb-12 bg-red-600 px-10 py-2 border-none rounded-md"
                    >
                      SIGN UP
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        // <OtpComp data={data}   />
        <OtpInput length={4} userData={data} />
      )}
    </>
  );
}

export default SignupComp;

// const response = await axios.post(
//   `http://localhost:8080/auth/signup`,
//   values,
//   { withCredentials: true }
// );

// const response = await AuthAxios.post('/signup',values)

// if (response.status === 200) {
//   console.log("routing to home page----------------->", response.status);
//   setStatus(!status);
// } else {
//   console.log("Error:", response.data);
// }
