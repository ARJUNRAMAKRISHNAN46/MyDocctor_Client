import { Formik, Form, Field, FormikProps } from "formik";
import { UserPassword } from "../../validation/UserPassword";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../redux/actions/AuthActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

interface FormValues {
  password: string;
  confirmPassword: string;
  email: string;
}

function ResetPassword() {
  const dispatch: AppDispatch = useDispatch();
  const [logError, setLogError] = useState(false);
  const navigate = useNavigate();

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const param = params.get("email");
  console.log("param :", param);

  const handleSubmit = (values: FormValues) => {
    console.log(values, param);
    values.email = String(param);
    dispatch(updatePassword(values))
      .then((res) => {
        if (res.type.endsWith("fulfilled")) {
          console.log("fulfilled=============================>");
          navigate('/login');
        }
        if (res.type.endsWith("rejected")) {
          setLogError(true);
        }
        console.log("🚀 ~ dispatch ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ err:", err);
      });
  };
  return (
    <div>
      {logError && (
        <div className="bg-red-500 text-white text-center py-2">
          Password update failed
        </div>
      )}
      <div className="pt-64 bg-gray-800 h-[100vh]">
        <Formik
          initialValues={initialValues}
          validationSchema={UserPassword}
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
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                ></Field>
              </div>
              <div className="md:ml-[595px]">
                {formikProps.errors.password &&
                  formikProps.touched.password && (
                    <small className="text-red-600 text-center">
                      {formikProps.errors.password}
                    </small>
                  )}
              </div>
              <div className="flex justify-center md:mt-6">
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
                  placeholder="re-enter password"
                ></Field>
              </div>
              <div className="md:ml-[595px]">
                {formikProps.errors.confirmPassword &&
                  formikProps.touched.confirmPassword && (
                    <small className="text-red-600 text-center">
                      {formikProps.errors.confirmPassword}
                    </small>
                  )}
              </div>
              <div className="flex justify-center mt-4 md:mt-6">
                <button
                  type="submit"
                  className="text-white font-bold mb-10 bg-red-600 px-8 py-1 border-none rounded-md"
                >
                  UPDATE
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ResetPassword;
