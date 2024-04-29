import { Formik, Form, Field, FormikProps } from "formik";
import { UserEmail } from "../../validation/UserEmail";
import { useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/actions/UserActions";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
}

const initialValues = {
  email: "",
};

function ForgotPassword() {
  const dispatch: AppDispatch = useDispatch();
  const [logError, setLogError] = useState(false);
  const [message, setMessage] = useState(false);

  const handleSubmit = (values: FormValues) => {
    try {
      console.log("🚀 ~ handleSubmit ~ email:", values?.email);
      dispatch(forgotPassword(values?.email))
        .then((res) => {
          if (res.type.endsWith("fulfilled")) {
            console.log("fulfilled=============================>");
            setMessage(true)
          }
          if (res.type.endsWith("rejected")) {
            setLogError(true);
          }
          console.log("🚀 ~ dispatch ~ res:", res);
        })
        .catch((err) => {
          console.log("🚀 ~ dispatch ~ err:", err);
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };
  return (
    <div className="bg-gray-800 h-[100vh]">
      {logError && (
        <div className="bg-red-500 text-white text-center py-2">
          Invalid email or password
        </div>
      )}
      {message && (
        <div className="bg-green-500 text-white text-center py-2">
          A link share to your email
        </div>
      )}
      <div className="pt-64">
        <Formik
          initialValues={initialValues}
          validationSchema={UserEmail}
          onSubmit={handleSubmit}
        >
          {(formikProps: FormikProps<FormValues>) => (
            <Form>
              <div className="flex justify-center">
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
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                ></Field>
              </div>
              <div className="md:ml-[595px]">
                {formikProps.errors.email && formikProps.touched.email && (
                  <small className="text-red-600 text-center">
                    {formikProps.errors.email}
                  </small>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="text-white font-bold mb-10 bg-red-600 px-8 py-1 border-none rounded-md"
                >
                  VERIFY
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
