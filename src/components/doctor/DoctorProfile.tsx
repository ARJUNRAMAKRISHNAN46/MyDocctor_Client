import { useEffect, useState } from "react";
import {
  findDoctorById,
  updateDoctorProfile,
} from "../../redux/actions/DoctorActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { UserData } from "../../types/userData";
import { Field, Form, Formik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../util/UploadImage";
import { DoctorDetails } from "../../validation/DoctorDetails";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { Specialities } from "../../util/Specialities";

const genderOptions = ["Male", "Female", "Other"];
interface profileValues {
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
  collegeName: string;
  currentWorkingHospital: string;
  profilePhoto: string;
  experienceCertificate: string;
  medicalLicense: string;
}

function DoctorProfile() {
  const [doctor, setDoctor] = useState<UserData>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [stateVisible, setStateVisible] = useState(false);
  const [cityVisible, setCityVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const userData = useSelector((state: RootState) => state.userData.user);
  console.log("🚀 ~ DoctorProfile ~ userData:", userData);
  const [isEditable, setIsEditable] = useState<boolean>(true);

  const initialValues = {
    gender: userData?.gender,
    dob: userData?.dob,
    email: userData?.email,
    country: userData?.country,
    state: userData?.state,
    city: userData?.city,
    medicalLicenseNumber: userData?.medicalLicenseNumber,
    pincode: userData?.pincode,
    expertise: userData?.expertise,
    yearsOfExperience: userData?.yearsOfExperience,
    collegeName: userData?.collegeName,
    currentWorkingHospital: userData?.currentWorkingHospital,
    profilePhoto: userData?.profilePhoto,
    experienceCertificate: userData?.experienceCertificate,
    medicalLicense: userData?.medicalLicense,
  };

  useEffect(() => {
    dispatch(findDoctorById(String(userData?._id)))
      .then((res) => {
        setDoctor(res.payload.data);
        console.log("🚀 ~ dispatch ~ doctor ~ res:", res.payload.data);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ err:", err);
      });
  }, [dispatch]);

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

  const handleSubmit = async (values: UserData) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    try {
      const experienceCertificate = await imageUpload(
        values.experienceCertificate
      );
      const profilePhoto = await imageUpload(values.profilePhoto);
      const medicalLicense = await imageUpload(values.medicalLicense);
      values.experienceCertificate = experienceCertificate;
      values.profilePhoto = profilePhoto;
      values.medicalLicense = medicalLicense;
      values.isProfile = true;

      dispatch(updateDoctorProfile(values))
        .then((res) => {
          console.log("🚀 ~ dispatch ~ res:", res);
          if (res.type.endsWith("fulfilled")) {
            navigate("/doctor/wait-for-verification");
          }
        })
        .catch((err) => {
          console.log("🚀 ~ dispatch ~ res:", err);
        });
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[96vh] flex justify-center p-8">
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
                        border: "1px solid #1F2937",
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
                      readOnly={isEditable}
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
                        border: "1px solid #1F2937",
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
                      readOnly={isEditable}
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
                        border: "1px solid #1F2937",
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
                      readOnly={isEditable}
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
                      className="border border-gray-600 rounded-[5px]"
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
                        className="border border-gray-600 rounded-[5px]"
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
                          value: city?.isoCode,
                          label: city.name,
                        }))}
                        name="city"
                        placeholder="Select city"
                        className="border border-gray-600 rounded-[5px]"
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
                        border: "1px solid #1F2937",
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
                      readOnly={isEditable}
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
                        border: "1px solid #1F2937",
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
                      readOnly={isEditable}
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
                        border: "1px solid #1F2937",
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
                      readOnly={isEditable}
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
                        border: "1px solid #1F2937",
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
                      readOnly={isEditable}
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
                        border: "1px solid #1F2937",
                        borderRadius: "5px",
                        width: "350px",
                        height: "40px",
                        color: "#1F2937",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      type="text"
                      name="collegeName"
                      placeholder="Graduate college name"
                      readOnly={isEditable}
                    />
                  </div>
                  {formikProps.errors.collegeName &&
                    formikProps.touched.collegeName && (
                      <small className="text-red-600 text-center">
                        {formikProps.errors.collegeName}
                      </small>
                    )}
                </div>
                <div className="p-4">
                  <div className="">
                    <Field
                      style={{
                        backgroundColor: "#ffff",
                        border: "1px solid #1F2937",
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
                      readOnly={isEditable}
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
                    className="bg-red-600 px-6 py-1 rounded-[5px] text-white font-semibold"
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

export default DoctorProfile;
