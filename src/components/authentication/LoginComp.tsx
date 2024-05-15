import { Formik, Form, Field } from "formik";
import { UserLoginValidation } from "../../validation/UserLogin";
import { useDispatch } from "react-redux";
import { FormikProps } from "formik";
import { LoginUser, googleLogin } from "../../redux/actions/AuthActions";
import { AppDispatch } from "../../redux/store";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const initialValues = {
  email: "",
  password: "",
};

interface FormValues {
  email: string;
  password: string;
  // role: string;
}

function LoginComp() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const googleSubmit = async (values: FormValues) => {
    console.log("🚀 ~ googleSubmit ~ values:", values);
    try {
      dispatch(googleLogin(values))
        .then((res) => {
          if (res.type.endsWith("fulfilled")) {
            if (res.payload.data.role === "user") {
              navigate("/userHome");
            } else if (res.payload.data.role === "doctor") {
              navigate("/doctor/updateDetails");
            } else {
              navigate("/admin/dashboard");
            }
          }

          if (res.type.endsWith("rejected")) {
          }
        })
        .catch((err) => {
          console.log("🚀 ~ googleSubmit ~ err:", err);
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response && error?.response.status === 409) {
        console.log("Error:", error);
      }
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      console.log("submitted", values);
      dispatch(LoginUser(values))
        .then((res) => {
          console.log("🚀 ~ dispatch ~ res:", res);
          if (res.type.endsWith("fulfilled")) {
            if (res.payload.data.role === "user") {
              navigate("/userHome");
            } else if (res.payload.data.role === "doctor") {
              navigate("/doctor/updateDetails");
            } else {
              navigate("/admin/adminHome");
            }
          }
          if (res.type.endsWith("rejected")) {
          }
        })
        .catch((err) => {
          console.log("🚀 ~ handleSubmit ~ err:", err);
        });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const handlePassword = () => {
    try {
      navigate("/forgotPassword");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };

  return (
    <div>
      <div className="md:flex grid-flow-row">
        <div className="md:w-[50%] mt-16 flex items-center hidden md:block">
          <img src="../../src/assets/patient-login.jpg" alt="login-image" />
        </div>
        <div className="bg-white md:w-[50%] h-[660px] p-3 md:p-0 md:h-[700px]">
          <div
            className="flex justify-center pt-8
            "
          >
            <h1 className="text-red-600 font-bold text-[10px] md:text-[40px]">
              My
            </h1>
            <h1 className="text-gray-700 font-bold text-[10px] md:text-[40px]">
              Doctor
            </h1>
          </div>
          <div className="text-center mt-4 text-black font-semibold">
            <h1 className="md:text-2xl font-bold">LOGIN HERE</h1>
          </div>
          <div className="flex justify-center">
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={UserLoginValidation}
                onSubmit={handleSubmit}
              >
                {(formikProps: FormikProps<FormValues>) => (
                  <Form>
                    <div className="">
                      <div className="flex justify-center md:mt-28 mt-10">
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
                          placeholder="Enter your email"
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
                      <div className="flex justify-center mt-3 md:mt-8">
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
                          placeholder="Enter your password"
                        ></Field>
                      </div>
                      {formikProps.errors.password &&
                        formikProps.touched.password && (
                          <small className="text-red-600 text-center">
                            {formikProps.errors.password}
                          </small>
                        )}
                    </div>
                    <div className="text-gray-900 text-[10px] md:text-[15px] mt-6">
                      <a onClick={handlePassword}>forgot password ?</a>
                    </div>
                    <div className="text-gray-900 text-[10px] md:text-[15px] font-semibold text-center mt-2 md:mt-6">
                      <a href="/signup">New to MyDocctor ? Register now</a>
                    </div>
                    <div className="flex justify-center mt-4">
                      <button
                        type="submit"
                        className="text-white font-bold mb-10 bg-red-600 px-10 py-2 border-none rounded-[5px]"
                      >
                        LOGIN
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="px-16 flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decodeToken = jwtDecode(
                  String(credentialResponse?.credential)
                );
                console.log("🚀 ~ loginComp ~ decodeToken:", decodeToken);
                const values = {
                  email: decodeToken?.email,
                  password: "User@123",
                  role: "doctor",
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
  );
}

export default LoginComp;
