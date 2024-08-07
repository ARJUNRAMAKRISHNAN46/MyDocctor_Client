import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { UserSignupValidation } from "../../validation/UserSignup";
import { FormikProps } from "formik";
import OtpInput from "./OtpInput";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { signupUser, userGoogle } from "../../redux/actions/AuthActions";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FormValues, GoogleValues } from "../../types/FormValues";
import { useNavigate } from "react-router-dom";
import appLogo from "../../../src/assets/MyDocctorLogo.png";

interface Tokendata {
  email: string;
  name: string;
}

const initialValues = {
  name: "",
  email: "",
  mobileNumber: "",
  password: "",
  confirmPassword: "",
  otp: "",
  role: "",
};

function SignupComp() {
  const [status, setStatus] = useState<boolean>(false);
  const [data, setData] = useState<FormValues | null>(null);
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const googleSubmit = async (values: GoogleValues) => {
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

  const handleSignup = () => {
    navigate("/login");
  };

  const handleRoute = () => {
    navigate("/doctor/signup");
  };

  return (
    <>
      {!status ? (
        <div className="md:flex grid-flow-row bg-white">
          <div className="md:w-[50%] h-[100vh] flex items-center hidden md:block">
            <div className="bg-violet-500 h-full rounded-br-[600px] flex justify-center items-center">
              <div>
                <h1 className="text-[40px] font-semibold  text-white text-center">
                  Already a Member ?
                </h1>
                <h1 className="font-thin text-white text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                </h1>
                <h1 className="font-thin text-white text-center">
                  beatae quas magnam!
                </h1>
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleSignup}
                    className="border-2 text-white px-10 py-2 rounded-full hover:bg-violet-600"
                  >
                    LOG IN
                  </button>
                </div>
                <div className="flex justify-center mt-8">
                  <h1
                    onClick={handleRoute}
                    className="text-white hover:border border-white px-6 py-1"
                  >
                    Register as a Doctor
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center md:w-[50%] h-[100vh]">
            <div className="bg-white w-[450px] border-4 shadow-2xl rounded-[20px]">
              <div
                className="flex justify-center md:hidden block
            "
              >
                <img className="w-72 mt-4" src={appLogo} alt={appLogo} />
              </div>
              <div className="text-center text-black font-semibold">
                <h1 className="md:text-2xl mt-4 text-violet-500 font-bold">
                  REGISTER HERE
                </h1>
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
                                border: "1px solid lightgray",
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
                          <div className="flex justify-center mt-2">
                            <Field
                              style={{
                                backgroundColor: "#ffff",
                                border: "1px solid lightgray",
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
                          <div className="flex justify-center mt-2">
                            <Field
                              style={{
                                backgroundColor: "#ffff",
                                border: "1px solid lightgray",
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
                          <div className="flex justify-center mt-2">
                            <Field
                              style={{
                                backgroundColor: "#ffff",
                                border: "1px solid lightgray",
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
                          <div className="flex justify-center mt-2">
                            <Field
                              style={{
                                backgroundColor: "#ffff",
                                border: "1px solid lightgray",
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
                        <div className="mt-2 md:hidden block">
                          <a
                            href="/doctor/signup"
                            className="text-gray-500 font-semibold text-sm"
                          >
                            are you a doctor ?
                          </a>
                        </div>
                        <div className="text-gray-900 md:hidden block text-[10px] md:text-[15px] font-semibold text-center mt-16 md:mt-8">
                          <a href="/login">Already a member ? Login now</a>
                        </div>
                        <div className="flex justify-center mt-4">
                          <button
                            type="submit"
                            className="text-white text-sm font-semibold mb-8 bg-violet-500 px-14 py-3 border-none rounded-full hover:bg-gradient-to-r from-violet-500 via-violet-700 to-violet-500"
                          >
                            SIGN UP
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="px-16 flex justify-center mb-6">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decodeToken: Tokendata = jwtDecode(
                      String(credentialResponse?.credential)
                    );
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
        </div>
      ) : (
        <OtpInput length={4} userData={data} />
      )}
    </>
  );
}

export default SignupComp;

// <OtpComp data={data}   />
