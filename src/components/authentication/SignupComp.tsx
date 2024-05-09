import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { UserSignupValidation } from "../../validation/UserSignup";
import { FormikProps } from "formik";
import OtpInput from "./OtpInput";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { signupUser, userGoogle } from "../../redux/actions/UserActions";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const initialValues = {
  name: "",
  email: "",
  mobileNumber: "",
  password: "",
  confirmPassword: "",
  otp: "",
  role: "",
};

interface FormValues {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  otp: string;
  role: string;
}

function SignupComp() {
  const [status, setStatus] = useState<boolean>(false);
  const [data, setData] = useState<FormValues | null>(null);

  const dispatch: AppDispatch = useDispatch();

  const googleSubmit = async (values: FormValues) => {
    try {
      dispatch(userGoogle(values))
        .then((res) => {
          console.log("🚀 ~ dispatch ~ res:", res);
        })
        .catch((err) => {
          console.log("🚀 ~ dispatch ~ err:", err);
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("🚀 ~ signupWithGoogle ~ error:", error);
      if (error?.response && error?.response.status === 409) {
        console.log("Error:", error);
      }
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      values.role = "user";
      setData(values);

      dispatch(signupUser(values))
        .then((res) => {
          console.log("🚀 ~ .then ~ res~~~~~~~~~~~~~~~~~~~~~:", res);

          if (res.type.endsWith("fulfilled")) {
            setStatus(true);
          }
          if (res.type.endsWith("rejected")) {
          }
        })
        .catch((err) => {
          console.log(err, " 909o0");
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      if (error?.response && error?.response.status === 409) {
        console.log("Error:", error);
      }
    }
  };

  return (
    <>
      {!status ? (
        <div className="md:flex grid-flow-row">
          <div className="md:w-[50%] mt-16 bg-white items-center hidden md:block">
            <img src="../../src/assets/patient-login.jpg" alt="login-image" />
          </div>
          <div className=" md:w-[50%] p-3 md:p-0 bg-white">
            <div
              className="flex justify-center pt-8
              "
            >
              <h1 className="text-red-600 font-bold text-[28px] md:text-[40px]">
                My
              </h1>
              <h1 className="text-gray-800 font-bold text-[28px] md:text-[40px]">
                Doctor
              </h1>
            </div>
            <div className="text-center mt-4 text-gray-800 font-semibold">
              <h1 className="md:text-xl font-bold">REGISTER HERE</h1>
            </div>
            <div className="flex justify-center">
              <div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={UserSignupValidation}
                  onSubmit={handleSubmit}
                >
                  {(formikProps: FormikProps<FormValues>) => (
                    <Form>
                      <div className="">
                        <div className="flex justify-center mt-12 md:mt-8">
                          <Field
                            style={{
                              backgroundColor: "#ffff",
                              border: "1px solid #1F2937",
                              borderRadius: "5px",
                              width: "350px",
                              height: "40px",
                              color: "gray",
                              paddingLeft: "10px",
                              outline: "none",
                            }}
                            type="text"
                            name="name"
                            placeholder="John Adams"
                          ></Field>
                        </div>
                        {formikProps.errors.name &&
                          formikProps.touched.name && (
                            <small className="text-red-600 text-center">
                              {formikProps.errors.name}
                            </small>
                          )}
                      </div>
                      <div>
                        <div className="flex justify-center mt-4">
                          <Field
                            style={{
                              backgroundColor: "#ffff",
                              border: "1px solid #1F2937",
                              borderRadius: "5px",
                              width: "350px",
                              height: "40px",
                              color: "gray",
                              paddingLeft: "10px",
                              outline: "none",
                            }}
                            type="text"
                            name="email"
                            placeholder="johnadams@gmail.com"
                          ></Field>
                        </div>
                        {formikProps.errors.email &&
                          formikProps.touched.email && (
                            <small className="text-red-600 text-center">
                              {formikProps.errors.email}
                            </small>
                          )}
                      </div>
                      <div>
                        <div className="flex justify-center mt-4">
                          <Field
                            style={{
                              backgroundColor: "#ffff",
                              border: "1px solid #1F2937",
                              borderRadius: "5px",
                              width: "350px",
                              height: "40px",
                              color: "gray",
                              paddingLeft: "10px",
                              outline: "none",
                            }}
                            type="tel"
                            name="mobileNumber"
                            placeholder="9874561230"
                          ></Field>
                        </div>
                        {formikProps.errors.mobileNumber &&
                          formikProps.touched.mobileNumber && (
                            <small className="text-red-600 text-center">
                              {formikProps.errors.mobileNumber}
                            </small>
                          )}
                      </div>
                      <div>
                        <div className="flex justify-center mt-4 ">
                          <Field
                            style={{
                              backgroundColor: "#ffff",
                              border: "1px solid #1F2937",
                              borderRadius: "5px",
                              width: "350px",
                              height: "40px",
                              color: "gray",
                              paddingLeft: "10px",
                              outline: "none",
                            }}
                            type="password"
                            name="password"
                            placeholder="John@123"
                          ></Field>
                        </div>
                        {formikProps.errors.password &&
                          formikProps.touched.password && (
                            <small className="text-red-600 text-center">
                              {formikProps.errors.password}
                            </small>
                          )}
                      </div>
                      <div>
                        <div className="flex justify-center mt-4">
                          <Field
                            style={{
                              backgroundColor: "#ffff",
                              border: "1px solid #1F2937",
                              borderRadius: "5px",
                              width: "350px",
                              height: "40px",
                              color: "gray",
                              paddingLeft: "10px",
                              outline: "none",
                            }}
                            type="password"
                            name="confirmPassword"
                            placeholder="John@123"
                          ></Field>
                        </div>
                        {formikProps.errors.confirmPassword &&
                          formikProps.touched.confirmPassword && (
                            <small className="text-red-600 text-center">
                              {formikProps.errors.confirmPassword}
                            </small>
                          )}
                      </div>
                      <Field type="hidden" name="otp" />
                      <Field type="hidden" name="role" value="user" />
                      <div className="mt-2">
                        <a href="/doctor/signup" className="text-gray-500 font-semibold text-sm">are you a doctor ?</a>
                      </div>
                      <div className="text-gray-900 text-[10px] md:text-[15px] font-semibold text-center mt-16 md:mt-8">
                        <a href="/login">Already a member ? Login now</a>
                      </div>
                      <div className="flex justify-center mt-4">
                        <button
                          type="submit"
                          className="text-white font-bold mb-8 bg-red-600 px-10 py-2 border-none rounded-md"
                        >
                          SIGN UP
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="px-16 flex justify-center mb-16">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decodeToken = jwtDecode(credentialResponse?.credential);
                  console.log(
                    "🚀 ~ DoctorSignupComp ~ decodeToken:",
                    decodeToken
                  );
                  const values = {
                    name: decodeToken?.name,
                    email: decodeToken?.email,
                    mobileNumber: "9876543210",
                    password: "User@123",
                    role: "user",
                  };

                  googleSubmit(values);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
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
