import { Formik, Form, Field } from "formik";
import { UserLoginValidation } from "../../validation/UserLogin";
import { useDispatch } from "react-redux";
import { FormikProps } from "formik";
import { LoginUser, googleLogin } from "../../redux/actions/AuthActions";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GoogleValues } from "../../types/FormValues";
import { useAuthContext } from "../../contexts/AuthContext";

const initialValues = {
  email: "",
  password: "",
};

interface FormValues {
  email: string;
  password: string;
}

function LoginComp() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { setAuthUser } = useAuthContext();

  const googleSubmit = async (values: FormValues) => {
    console.log("🚀 ~ googleSubmit ~ values:", values);
    try {
      dispatch(googleLogin(values))
        .then((res) => {
          setAuthUser(res.payload.data);
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
          setAuthUser(res.payload.data);
          console.log("🚀 ~ dispatch ~ res:", res);
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

  const handleSignup = () => {
    try {
      navigate("/signup");
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="md:flex grid-flow-row">
        <div className="md:w-[50%] h-[100vh] flex items-center hidden md:block">
          {/* <img src="../../src/assets/patient-login.jpg" alt="login-image" /> */}
          <div className="bg-violet-500 h-full rounded-br-[600px] flex justify-center items-center">
            <div>
              <h1 className="text-[40px] font-semibold  text-white text-center">
                New Here ?
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
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center md:w-[50%] h-[100vh]">
          <div className="bg-white w-[450px] border-4 shadow-2xl rounded-[20px]">
            <div
              className="flex justify-center
            "
            >
              <img
                className="w-72 mt-4"
                src="../../../src/assets/MyDocctorLogo.png"
                alt=""
              />
            </div>
            <div className="text-center text-black font-semibold">
              <h1 className="md:text-2xl text-violet-500 font-bold">
                LOGIN HERE
              </h1>
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
                        <div className="flex justify-center mt-6">
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
                        <div className="flex justify-center mt-3 md:mt-4">
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
                      <div className="text-gray-900 text-[10px] md:hidden block md:text-[15px] font-semibold text-center mt-2 md:mt-6">
                        <a href="/signup">New to MyDocctor ? Register now</a>
                      </div>
                      <div className="flex justify-center mt-4">
                        <button
                          type="submit"
                          className="text-white text-sm font-semibold mb-6 bg-violet-500 px-16 py-3 border-none rounded-full hover:bg-gradient-to-r from-violet-500 via-violet-700 to-violet-500"
                        >
                          LOGIN
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="px-16 flex justify-center mb-8">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decodeToken: GoogleValues = jwtDecode(
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
    </div>
  );
}

export default LoginComp;
