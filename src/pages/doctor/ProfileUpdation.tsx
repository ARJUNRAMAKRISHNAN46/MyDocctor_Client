import { Formik, Form, Field } from "formik";
import { DoctorDetails } from "../../validation/DoctorDetails";
import { FormikProps } from "formik";
import { Country, State, City } from "country-state-city";
import { useState } from "react";
import Select from "react-select";
import { Specialities } from "../../util/Specialities";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialValues = {
  name: "",
  email: "",
  gender: "",
  dob: "",
  mobileNumber: "",
  country: "",
  state: "",
  city: "",
  medicalLicenseNumber: "",
  pincode: "",
  expertise: "",
  yearsOfExperience: "",
  collageName: "",
  currentWorkingHospital: "",
};
const genderOptions = ["Male", "Female", "Other"];
interface profileValues {
  name: string;
  email: string;
  gender: string;
  dob: string;
  mobileNumber: string;
  country: string;
  state: string;
  city: string;
  expertise: string;
  pincode: string;
  medicalLicenseNumber: string;
  yearsOfExperience: string;
  collageName: string;
  currentWorkingHospital: string;
}
function ProfileUpdation() {
  const [stateVisible, setStateVisible] = useState(false);
  const [cityVisible, setCityVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  const handleCountry = (value: string) => {
    console.log("country : ", value);
    setStateVisible(true);
    console.log("stateVisible : ", stateVisible);
    setCountryCode(value);
  };

  const handleState = (value: string) => {
    console.log("state : ", value);
    setCityVisible(true);
    setStateCode(value);
  };

  const handleSubmit = (values: profileValues) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
  };
  return (
    <div className="bg-gray-800 w-[100vw] h-[100vw]">
      <div>
        <div className="flex justify-center pt-8">
          <h1 className="text-red-600 font-bold text-[28px] md:text-[40px]">
            My
          </h1>
          <h1 className="text-white font-bold text-[28px] md:text-[40px]">
            Doctor
          </h1>
        </div>
      </div>
      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={DoctorDetails}
          onSubmit={handleSubmit}
        >
          {(formikProps: FormikProps<profileValues>) => (
            <Form>
              <div className="grid grid-cols-3 md:px-28">
                <div>
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
                    placeholder="John Adam"
                  ></Field>
                  {formikProps.errors.name && formikProps.touched.name && (
                    <small className="text-red-600 text-center">
                      {formikProps.errors.name}
                    </small>
                  )}
                </div>
                <div className="">
                </div>
                <div className="mt-4">
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
                    as="select"
                    type="text"
                    name="gender"
                    placeholder="Enter your gender"
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map((gender, index) => (
                      <option key={index} value={gender.toLowerCase()}>
                        {gender}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="md:ml-48">
                  {formikProps.errors.gender && formikProps.touched.gender && (
                    <small className="text-red-600 text-center">
                      {formikProps.errors.gender}
                    </small>
                  )}
                </div>
                <div className="">
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
                    placeholder="johnadam@gmail.com"
                  ></Field>
                </div>
                <div className="md:ml-48">
                  {formikProps.errors.email && formikProps.touched.email && (
                    <small className="text-red-600 text-center">
                      {formikProps.errors.email}
                    </small>
                  )}
                </div>
                <div className="mt-4">
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
                    name="dob"
                    placeholder="12-06-2005"
                  ></Field>
                </div>
                <div className="md:ml-48">
                  {formikProps.errors.dob && formikProps.touched.dob && (
                    <small className="text-red-600 text-center">
                      {formikProps.errors.dob}
                    </small>
                  )}
                </div>
                <div className="mt-4">
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
                    name="mobileNumber"
                    placeholder="9876543210"
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
                {/* --------------------------------------------------------------------------------------------------------------------------------------- */}
                <div className="w-[350px] mt-4">
                  <Select
                    options={Country.getAllCountries().map((country) => ({
                      value: country.isoCode,
                      label: country.name,
                    }))}
                    name="country"
                    placeholder="Select Country"
                    onChange={(option: any) => {
                      formikProps.setFieldValue("country", option.label);
                      handleCountry(option.value);
                    }}
                    onBlur={() => formikProps.setFieldTouched("country", true)}
                    isSearchable
                  />
                  {formikProps.errors.country &&
                    formikProps.touched.country && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.country}
                      </small>
                    )}
                </div>
                <div className="md:ml-48">
                  {formikProps.errors.country &&
                    formikProps.touched.country && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.country}
                      </small>
                    )}
                </div>
                {stateVisible && (
                  <div className="w-[350px] mt-4">
                    <Select
                      options={State.getStatesOfCountry(countryCode)?.map(
                        (state) => ({
                          value: state.isoCode,
                          label: state.name,
                        })
                      )}
                      name="state"
                      placeholder="Select state"
                      onChange={(option: any) => {
                        console.log("option inside the select method", option);
                        formikProps.setFieldValue("state", option.label);
                        handleState(option.value);
                      }}
                      onBlur={() => formikProps.setFieldTouched("state", true)}
                      isSearchable
                    />
                    {formikProps.errors.state && formikProps.touched.state && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.state}
                      </small>
                    )}
                  </div>
                )}
                {cityVisible && (
                  <div className="w-[350px] mt-4">
                    <Select
                      options={City.getCitiesOfState(
                        countryCode,
                        stateCode
                      )?.map((city) => ({
                        value: city.isoCode,
                        label: city.name,
                      }))}
                      name="city"
                      placeholder="Select city"
                      onChange={(option: any) => {
                        console.log("option inside the select method", option);
                        formikProps.setFieldValue("city", option.label);
                      }}
                      onBlur={() => formikProps.setFieldTouched("state", true)}
                      isSearchable
                    />
                    {formikProps.errors.state && formikProps.touched.state && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.state}
                      </small>
                    )}
                  </div>
                )}
                <div className="mt-4">
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
                    name="pincode"
                    placeholder="pincode"
                  />
                </div>
                <div className="md:ml-48">
                  {formikProps.errors.pincode &&
                    formikProps.touched.pincode && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.pincode}
                      </small>
                    )}
                </div>
                <div className="mt-4">
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
                    as="select"
                    type="text"
                    name="expertise"
                    placeholder="Select your expertise"
                  >
                    <option value="">Select Expertise</option>
                    {Specialities.map((spl, index) => (
                      <option key={index} value={spl.toLowerCase()}>
                        {spl}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="md:ml-48">
                  {formikProps.errors.expertise &&
                    formikProps.touched.expertise && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.expertise}
                      </small>
                    )}
                </div>
                <div className="mt-4">
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
                    name="medicalLicenseNumber"
                    placeholder="MD-1234567890"
                  />
                </div>
                <div className="md:ml-48">
                  {formikProps.errors.medicalLicenseNumber &&
                    formikProps.touched.medicalLicenseNumber && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.medicalLicenseNumber}
                      </small>
                    )}
                </div>
                <div className="mt-4">
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
                    type="number"
                    name="yearsOfExperience"
                    placeholder="Years of experience"
                  />
                </div>
                <div className="md:ml-48">
                  {formikProps.errors.yearsOfExperience &&
                    formikProps.touched.yearsOfExperience && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.yearsOfExperience}
                      </small>
                    )}
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  className="bg-red-600 px-6 py-1 rounded-md"
                  type="submit"
                >
                  submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProfileUpdation;
