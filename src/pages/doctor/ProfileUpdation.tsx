import { updateDoctorProfile } from "../../redux/actions/DoctorActions";
import { DoctorDetails } from "../../validation/DoctorDetails";
import { Country, State, City } from "country-state-city";
import { Specialities } from "../../utils/Specialities";
import "react-datepicker/dist/react-datepicker.css";
import { UserData } from "../../types/userData";
import { AppDispatch } from "../../redux/store";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { FormikProps } from "formik";
import Select from "react-select";
import { useState } from "react";
import { imageUpload } from "../../utils/UploadImage";
import { useNavigate } from "react-router-dom";

const initialValues = {
  isProfile: true,
  gender: "",
  dob: "",
  email: "",
  country: "",
  state: "",
  city: "",
  medicalLicenseNumber: "",
  pincode: "",
  expertise: "",
  yearsOfExperience: "",
  education: "",
  currentWorkingHospital: "",
  profilePhoto: "",
  experienceCertificate: "",
  medicalLicense: "",
};
const genderOptions = ["Male", "Female", "Other"];
export interface profileValues {
  isProfile: boolean;
  gender: string;
  dob: string;
  email: string;
  country: string;
  state: string;
  city: string;
  expertise: string;
  pincode: string;
  medicalLicenseNumber: string;
  yearsOfExperience: string;
  education: string;
  currentWorkingHospital: string;
  profilePhoto: string;
  experienceCertificate: string;
  medicalLicense: string;
}
function ProfileUpdation() {
  const [stateVisible, setStateVisible] = useState(false);
  const [cityVisible, setCityVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = async (values: profileValues) => {
    console.log("🚀 ~ handleSubmit ~ values:", values)
    try {
      const experienceCertificate = await imageUpload(
        values.experienceCertificate
      );
      const profilePhoto = await imageUpload(values.profilePhoto);
      const medicalLicense = await imageUpload(values.medicalLicense);
      values.experienceCertificate = experienceCertificate;
      values.profilePhoto = profilePhoto;
      values.medicalLicense = medicalLicense;

      dispatch(updateDoctorProfile(values))
        .then((res) => {
          console.log("🚀 ~ dispatch ~ res:", res);
          if(res.type.endsWith('fulfilled')) {
            navigate('/doctor/wait-for-verification')
          }
        })
        .catch((err) => {
          console.log("🚀 ~ dispatch ~ res:", err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const showPreview = (previewId: string, file: Blob) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const preview = document.getElementById(previewId);
      if (preview instanceof HTMLElement) {
        preview.innerHTML = "";
        const img = document.createElement("img");

        img.src = String(reader.result);
        img.className = "w-20 h-20 rounded-full";
        preview.appendChild(img);
      }
    };

    if (file) {
      console.log("🚀 ~ showPreview ~ file:", typeof reader.readAsDataURL);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100 w-[100vw] h-[100vh]">
      <div className="flex justify-center">
        <img className="w-[300px]" src="../../../src/assets/MyDocctorLogo.png" alt="" />
      </div>
      <div className="flex justify-center mt-10">
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={DoctorDetails}
            onSubmit={handleSubmit}
          >
            {(formikProps: FormikProps<profileValues>) => (
              <Form className="grid md:grid-cols-3">
                <div className="p-4">
                  <div className="">
                    <Field
                      style={{
                        backgroundColor: "#ffff",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "#1F2937",
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
                  {formikProps.errors.gender && formikProps.touched.gender && (
                    <small className="text-red-600 text-center">
                      {formikProps.errors.gender}
                    </small>
                  )}
                </div>
                <div className="p-4">
                  <div className="">
                    <Field
                      style={{
                        backgroundColor: "#ffff",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "#1F2937",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="text"
                      name="dob"
                      placeholder="2000-06-06"
                    ></Field>
                  </div>
                  {formikProps.errors.dob && formikProps.touched.dob && (
                    <small className="text-red-600 text-center">
                      {formikProps.errors.dob}
                    </small>
                  )}
                </div>
                <div className="p-4">
                  <div className="">
                    <Field
                      style={{
                        backgroundColor: "#ffff",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "#1F2937",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="email"
                      name="email"
                      placeholder="registered email"
                    ></Field>
                  </div>
                  {formikProps.errors.email && formikProps.touched.email && (
                    <small className="text-red-600 text-center">
                      {formikProps.errors.email}
                    </small>
                  )}
                </div>
                <div className="p-4">
                  <div className="w-[350px]">
                    <Select
                      options={Country.getAllCountries().map((country) => ({
                        value: country.isoCode,
                        label: country.name,
                      }))}
                      name="country"
                      placeholder="Select Country"
                      className="border border-gray-400 rounded-[5px]"
                      onChange={(option: any) => {
                        formikProps.setFieldValue("country", option.label);
                        handleCountry(option.value);
                      }}
                      onBlur={() =>
                        formikProps.setFieldTouched("country", true)
                      }
                      isSearchable
                    />
                    {formikProps.errors.country &&
                      formikProps.touched.country && (
                        <small className="text-red-600 text-center">
                          {formikProps.errors.country}
                        </small>
                      )}
                  </div>
                </div>
                <div className="p-4">
                  {stateVisible && (
                    <div className="w-[350px]">
                      <Select
                        options={State.getStatesOfCountry(countryCode)?.map(
                          (state) => ({
                            value: state.isoCode,
                            label: state.name,
                          })
                        )}
                        name="state"
                        placeholder="Select state"
                        className="border border-gray-400 rounded-[5px]"
                        onChange={(option: any) => {
                          console.log(
                            "option inside the select method",
                            option
                          );
                          formikProps.setFieldValue("state", option.label);
                          handleState(option.value);
                        }}
                        onBlur={() =>
                          formikProps.setFieldTouched("state", true)
                        }
                        isSearchable
                      />
                      {formikProps.errors.state &&
                        formikProps.touched.state && (
                          <small className="text-red-600 text-center">
                            {formikProps.errors.state}
                          </small>
                        )}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  {cityVisible && (
                    <div className="w-[350px]">
                      <Select
                        options={City.getCitiesOfState(
                          countryCode,
                          stateCode
                        )?.map((city) => ({
                          value: city?.name,
                          label: city.name,
                        }))}
                        name="city"
                        placeholder="Select city"
                        className="border border-gray-400 rounded-[5px]"
                        onChange={(option: any) => {
                          console.log(
                            "option inside the select method",
                            option
                          );
                          formikProps.setFieldValue("city", option.label);
                        }}
                        onBlur={() =>
                          formikProps.setFieldTouched("state", true)
                        }
                        isSearchable
                      />
                      {formikProps.errors.state &&
                        formikProps.touched.state && (
                          <small className="text-red-600 text-center">
                            {formikProps.errors.state}
                          </small>
                        )}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="">
                    <Field
                      style={{
                        backgroundColor: "#ffff",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "#1F2937",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="text"
                      name="pincode"
                      placeholder="pincode"
                    />
                  </div>
                  {formikProps.errors.pincode &&
                    formikProps.touched.pincode && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.pincode}
                      </small>
                    )}
                </div>
                <div className="p-4">
                  <div className="">
                    <Field
                      style={{
                        backgroundColor: "#ffff",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "#1F2937",
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
                  {formikProps.errors.expertise &&
                    formikProps.touched.expertise && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.expertise}
                      </small>
                    )}
                </div>
                <div className="p-4">
                  <div className="">
                    <Field
                      style={{
                        backgroundColor: "#ffff",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "#1F2937",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="text"
                      name="medicalLicenseNumber"
                      placeholder="MD-1234567890"
                    />
                  </div>
                  {formikProps.errors.medicalLicenseNumber &&
                    formikProps.touched.medicalLicenseNumber && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.medicalLicenseNumber}
                      </small>
                    )}
                </div>
                <div className="p-4">
                  <div className="">
                    <Field
                      style={{
                        backgroundColor: "#ffff",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "#1F2937",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="number"
                      name="yearsOfExperience"
                      placeholder="Years of experience"
                    />
                  </div>
                  {formikProps.errors.yearsOfExperience &&
                    formikProps.touched.yearsOfExperience && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.yearsOfExperience}
                      </small>
                    )}
                </div>
                <div className="p-4">
                  <div className="">
                    <Field
                      style={{
                        backgroundColor: "#ffff",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "#1F2937",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="text"
                      name="education"
                      placeholder="Graduate college name"
                    />
                  </div>
                  {formikProps.errors.education &&
                    formikProps.touched.education && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.education}
                      </small>
                    )}
                </div>
                <div className="p-4">
                  <div className="">
                    <Field
                      style={{
                        backgroundColor: "#ffff",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "#1F2937",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="text"
                      name="currentWorkingHospital"
                      placeholder="Current working hospital"
                    />
                  </div>
                  {formikProps.errors.currentWorkingHospital &&
                    formikProps.touched.currentWorkingHospital && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.currentWorkingHospital}
                      </small>
                    )}
                </div>
                <div className="p-4">
                  <input
                    type="file"
                    id="profilePhotoInput"
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        formikProps.setFieldValue(
                          "profilePhoto",
                          event.currentTarget.files[0]
                        );
                        showPreview(
                          "profilePhotoPreview",
                          event.currentTarget.files[0]
                        );
                      }
                    }}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="profilePhotoInput" className="btn">
                    Choose Profile Photo
                  </label>
                  <div id="profilePhotoPreview"></div>
                  {formikProps.errors.profilePhoto &&
                    formikProps.touched.profilePhoto && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.profilePhoto}
                      </small>
                    )}
                </div>
                <div className="p-4">
                  <input
                    type="file"
                    id="experienceCertificateInput"
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        formikProps.setFieldValue(
                          "experienceCertificate",
                          event.currentTarget.files[0]
                        );
                        showPreview(
                          "experienceCertificatePreview",
                          event.currentTarget.files[0]
                        );
                      }
                    }}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="experienceCertificateInput" className="btn">
                    Choose Experience Certificate
                  </label>
                  <div id="experienceCertificatePreview"></div>
                  {formikProps.errors.experienceCertificate &&
                    formikProps.touched.experienceCertificate && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.experienceCertificate}
                      </small>
                    )}
                </div>
                <div className="p-4">
                  <input
                    type="file"
                    id="medicalLicenseInput"
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        formikProps.setFieldValue(
                          "medicalLicense",
                          event.currentTarget.files[0]
                        );
                        showPreview(
                          "medicalLicensePreview",
                          event.currentTarget.files[0]
                        );
                      }
                    }}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="medicalLicenseInput" className="btn">
                    Choose Medical License
                  </label>
                  <div id="medicalLicensePreview"></div>
                  {formikProps.errors.medicalLicense &&
                    formikProps.touched.medicalLicense && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.medicalLicense}
                      </small>
                    )}
                </div>
                <div className="mt-6 flex justify-center"></div>
                <div className="mt-6 flex justify-center">
                  <button
                    className="bg-violet-600 px-14 py-2 rounded-full text-white font-semibold"
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
    </div>
  );
}

export default ProfileUpdation;
