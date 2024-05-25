// import { Field, Form, Formik, FormikProps } from "formik";
// import { UserProfileValidation } from "../../validation/UserProfileValidation";
// import { UserProfileData } from "../../types/UserProfile";
// import { imageUpload } from "../../util/UploadImage";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";
// import { updateProfile } from "../../redux/actions/UserActions";
// import { useNavigate } from "react-router-dom";

// function ProfileModal(props: any) {
//   const dispatch: AppDispatch = useDispatch();
//   const navigate = useNavigate();

//   const initialValues = {
//     _id: props.userData?._id || "",
//     name: props.userData?.name || "",
//     email: props.userData?.email || "",
//     mobileNumber: props.userData?.mobileNumber || "",
//     dob: props.userData?.dob || "",
//     country: props.userData?.country || "",
//     state: props.userData?.state || "",
//     city: props.userData?.city || "",
//     pincode: props.userData?.pincode || "",
//     profilePhoto: props.userData?.profilePhoto || "",
//   };

//   const handleSubmit = async (values: UserProfileData) => {
//     const profile = await imageUpload(values?.profilePhoto);
//     console.log("🚀 ~ handleSubmit ~ profile:", profile);
//     values.profilePhoto = profile;
//     console.log(values);

//     dispatch(updateProfile(values))
//       .then((res) => {
//         if (res.type.endsWith("fulfilled")) {
//           console.log("🚀 ~ dispatch ~ res:", res);
//           navigate("/");
//         }
//       })
//       .catch((err) => {
//         console.log("🚀 ~ dispatch ~ err:", err);
//       });
//   };

//   const showPreview = (previewId: string, file: Blob) => {
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const preview = document.getElementById(previewId);
//       if (preview instanceof HTMLElement) {
//         preview.innerHTML = "";
//         const img = document.createElement("img");

//         img.src = String(reader.result);
//         img.className = "w-20 h-20 rounded-full";
//         preview.appendChild(img);
//       }
//     };

//     if (file) {
//       console.log("🚀 ~ showPreview ~ file:", typeof reader.readAsDataURL);
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-[100vh]">
//       <div className="md:w-[435px] py-8 rounded-[5px] bg-gray-300 px-10">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={UserProfileValidation}
//           onSubmit={handleSubmit}
//         >
//           {(formikProps: FormikProps<UserProfileData>) => (
//             <Form className="">
//               <div className="flex justify-end" onClick={props?.closeModal}>
//                 <h1 className="font-bold m-2 border-2 px-1.5">X</h1>
//               </div>
//               <div className="p-4 bg-gray-500 text-white rounded-[5px] mb-4 text-center">
//                 <input
//                   type="file"
//                   id="profileimageinput"
//                   onChange={(event) => {
//                     if (event.currentTarget.files) {
//                       formikProps.setFieldValue(
//                         "profilePhoto",
//                         event.currentTarget.files[0]
//                       );
//                       showPreview(
//                         "profilePhotoPreview",
//                         event.currentTarget.files[0]
//                       );
//                     }
//                   }}
//                   style={{ display: "none" }}
//                 />
//                 <label htmlFor="profileimageinput" className="btn">
//                   Choose Profile Photo
//                 </label>
//                 <div
//                   className="flex justify-center"
//                   id="profilePhotoPreview"
//                 ></div>
//                 {formikProps.errors.profilePhoto &&
//                   formikProps.touched.profilePhoto && (
//                     <small className="text-red-600 text-center">
//                       {formikProps.errors.profilePhoto}
//                     </small>
//                   )}
//               </div>
//               <div className="mb-2">
//                 <Field
//                   style={{
//                     backgroundColor: "#ffff",
//                     border: "1px solid #1F2937",
//                     borderRadius: "5px",
//                     width: "350px",
//                     height: "40px",
//                     color: "gray",
//                     paddingLeft: "10px",
//                     outline: "none",
//                   }}
//                   type="text"
//                   name="name"
//                   placeholder="John Adams"
//                 />
//                 {formikProps.errors.name && formikProps.touched.name && (
//                   <small className="text-red-600 text-center">
//                     {formikProps.errors.name}
//                   </small>
//                 )}
//               </div>
//               <div className="mb-2">
//                 <Field
//                   style={{
//                     backgroundColor: "#ffff",
//                     border: "1px solid #1F2937",
//                     borderRadius: "5px",
//                     width: "350px",
//                     height: "40px",
//                     color: "gray",
//                     paddingLeft: "10px",
//                     outline: "none",
//                   }}
//                   type="text"
//                   name="mobileNumber"
//                   placeholder="9876547896"
//                 />
//                 {formikProps.errors.mobileNumber &&
//                   formikProps.touched.mobileNumber && (
//                     <small className="text-red-600 text-center">
//                       {formikProps.errors.mobileNumber}
//                     </small>
//                   )}
//               </div>
//               <div className="mb-2">
//                 <Field
//                   style={{
//                     backgroundColor: "#ffff",
//                     border: "1px solid #1F2937",
//                     borderRadius: "5px",
//                     width: "350px",
//                     height: "40px",
//                     color: "gray",
//                     paddingLeft: "10px",
//                     outline: "none",
//                   }}
//                   type="text"
//                   name="dob"
//                   placeholder="2000-04-04"
//                 />
//                 {formikProps.errors.dob && formikProps.touched.dob && (
//                   <small className="text-red-600 text-center">
//                     {formikProps.errors.dob}
//                   </small>
//                 )}
//               </div>
//               <div className="mb-2">
//                 <Field
//                   style={{
//                     backgroundColor: "#ffff",
//                     border: "1px solid #1F2937",
//                     borderRadius: "5px",
//                     width: "350px",
//                     height: "40px",
//                     color: "gray",
//                     paddingLeft: "10px",
//                     outline: "none",
//                   }}
//                   type="text"
//                   name="country"
//                   placeholder="India"
//                 />
//                 {formikProps.errors.country && formikProps.touched.country && (
//                   <small className="text-red-600 text-center">
//                     {formikProps.errors.country}
//                   </small>
//                 )}
//               </div>
//               <div className="mb-2">
//                 <Field
//                   style={{
//                     backgroundColor: "#ffff",
//                     border: "1px solid #1F2937",
//                     borderRadius: "5px",
//                     width: "350px",
//                     height: "40px",
//                     color: "gray",
//                     paddingLeft: "10px",
//                     outline: "none",
//                   }}
//                   type="text"
//                   name="state"
//                   placeholder="Kerala"
//                 />
//                 {formikProps.errors.state && formikProps.touched.state && (
//                   <small className="text-red-600 text-center">
//                     {formikProps.errors.state}
//                   </small>
//                 )}
//               </div>
//               <div className="mb-2">
//                 <Field
//                   style={{
//                     backgroundColor: "#ffff",
//                     border: "1px solid #1F2937",
//                     borderRadius: "5px",
//                     width: "350px",
//                     height: "40px",
//                     color: "gray",
//                     paddingLeft: "10px",
//                     outline: "none",
//                   }}
//                   type="text"
//                   name="city"
//                   placeholder="Calicut"
//                 />
//                 {formikProps.errors.city && formikProps.touched.city && (
//                   <small className="text-red-600 text-center">
//                     {formikProps.errors.city}
//                   </small>
//                 )}
//               </div>
//               <div className="mb-2">
//                 <Field
//                   style={{
//                     backgroundColor: "#ffff",
//                     border: "1px solid #1F2937",
//                     borderRadius: "5px",
//                     width: "350px",
//                     height: "40px",
//                     color: "gray",
//                     paddingLeft: "10px",
//                     outline: "none",
//                   }}
//                   type="text"
//                   name="pincode"
//                   placeholder="654789"
//                 />
//                 {formikProps.errors.pincode && formikProps.touched.pincode && (
//                   <small className="text-red-600 text-center">
//                     {formikProps.errors.pincode}
//                   </small>
//                 )}
//               </div>
//               <div className="mt-6 flex justify-center">
//                 <button
//                   className="bg-red-600 px-6 py-1 rounded-[5px] text-white font-semibold"
//                   type="submit"
//                 >
//                   Update
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

// export default ProfileModal;
