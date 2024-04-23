import { Field, Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLoginValidation } from "../validation/UserLogin";
import { useDispatch } from "react-redux";
import { updatePassword } from "../redux/actions/UserActions";
import { UpdatePassword } from "../types/userData";
import { AppDispatch } from "../redux/store";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

function ForgotPassword() {
  const [logError, setLogError] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: UpdatePassword) => {
    try {
      const res = await dispatch(updatePassword(values));
      console.log("🚀 ~ handleSubmit ~ res:", res);

        navigate("/login");
    } catch (error) {
      console.error("Error updating password:", error);
      setLogError(true);
    }
  };

  return (
    <div>
      {logError && (
        <div className="bg-red-500 text-white text-center py-2">
          User not found
        </div>
      )}
      <div className="md:flex grid-flow-row">
        <div className="md:w-[50%] mt-16 flex items-center hidden md:block">
          <img src="../../src/assets/patient-login.jpg" alt="login-image" />
        </div>
        <div className="bg-gray-800 md:w-[50%] h-[660px] p-3 md:p-0 md:h-[700px]">
          <div className="flex justify-center pt-8">
            <h1 className="text-red-600 font-bold text-[10px] md:text-[40px]">
              My
            </h1>
            <h1 className="text-white font-bold text-[10px] md:text-[40px]">
              Doctor
            </h1>
          </div>
          <div className="text-center mt-4 text-white font-semibold">
            <h1 className="md:text-2xl font-bold">Change Password</h1>
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
                  />
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
                  />
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
                  <button
                    type="submit"
                    className="text-white font-semibold mb-10 bg-red-600 px-8 mt-8 py-2 border-none rounded-md"
                  >
                    UPDATE PASSWORD
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

export default ForgotPassword;
