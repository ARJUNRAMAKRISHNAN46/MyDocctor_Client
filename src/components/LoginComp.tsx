import { Formik, Form, Field } from "formik";
import { UserLoginValidation } from "../validation/UserLogin";
import { useDispatch } from "react-redux";
import { FormikProps } from "formik";
import { LoginUser } from "../redux/actions/UserActions";
import { AppDispatch } from "../redux/store";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

interface FormValues {
  email: string;
  password: string;
  role: "user" | "doctor" | "admin";
}

function LoginComp() {
  const [logError, setLogError] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (values: FormValues) => {
    try {
      console.log("submitted", values);
      dispatch(LoginUser(values))
        .then((res) => {
          console.log("🚀 ~ dispatch ~ res:", res);
          if (res.type.endsWith("rejected")) {
            setLogError(true);
          }
          setTimeout(() => {
            setLogError(false);
          }, 3000);
        })
        .catch((err) => {
          console.log("🚀 ~ dispatch ~ err:", err);
        });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <div>
      {logError && (
        <div className="bg-red-500 text-white text-center py-2">
          Invalid email or password
        </div>
      )}
      <div className="md:flex grid-flow-row">
        <div className="md:w-[50%] mt-16 flex items-center hidden md:block">
          <img src="../../src/assets/patient-login.jpg" alt="login-image" />
        </div>
        <div className="bg-gray-800 md:w-[50%] h-[660px] p-3 md:p-0 md:h-[700px]">
          <div
            className="flex justify-center pt-8
            "
          >
            <h1 className="text-red-600 font-bold text-[10px] md:text-[40px]">
              My
            </h1>
            <h1 className="text-white font-bold text-[10px] md:text-[40px]">
              Doctor
            </h1>
          </div>
          <div className="text-center mt-4 text-white font-semibold">
            <h1 className="md:text-2xl font-bold">LOGIN HERE</h1>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={UserLoginValidation}
            onSubmit={handleSubmit}
          >
            {(formikProps: FormikProps<FormValues>) => (
              <Form>
                <div className="flex justify-center md:mt-28 mt-10">
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
                <div className="flex justify-center mt-3 md:mt-8">
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
                <div className="text-gray-300 text-[10px] md:text-[15px] text-center mt-4 md:mt-14">
                  <a href="/signup">New to MyDocctor ? Register now</a>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="text-white font-bold mb-10 bg-red-600 px-10 py-2 border-none rounded-md"
                  >
                    LOGIN
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default LoginComp;
