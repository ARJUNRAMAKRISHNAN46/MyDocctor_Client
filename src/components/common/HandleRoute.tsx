import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { Suspense, lazy, useEffect } from "react";
import { getUser } from "../../redux/actions/AuthActions";
import { Navigate, Route, Routes } from "react-router-dom";
import SlotBooking from "../../pages/user/SlotBooking";
import DoctorReview from "../user/DoctorReview";
import UserProfile from "../../pages/user/UserProfile";
import ProfileLayout from "../../pages/user/ProfileLayout";
import FavouriteDoctors from "./FavouriteDoctors";
import UserBookings from "../user/UserBookings";
import UserPrescriptions from "../user/UserPrescriptions";
import UserChats from "../user/UserChats";
import DoctorLayout from "../doctor/DoctorLayout";
import PageNotFound from "./PageNotFound";
import DoctorOverview from "../doctor/DoctorOverview";
import DoctorAppoitnments from "../doctor/DoctorAppoitnments";
import DoctorPatients from "../doctor/DoctorPatients";
import DoctorMessages from "../doctor/DoctorMessages";
import DoctorProfile from "../user/DoctorProfile";
import DoctorSlots from "../doctor/DoctorSlots";
import DoctorSignup from "../../pages/doctor/DoctorSignup";
import ProfileUpdation from "../../pages/doctor/ProfileUpdation";
import DoctorWaiting from "../../pages/doctor/DoctorWaiting";

const Login = lazy(() => import("../../pages/user/Login"));
const Signup = lazy(() => import("../../pages/user/Signup"));
const Doctors = lazy(() => import("../../pages/user/Doctors"));
const Home = lazy(() => import("../../pages/user/Home"));
const About = lazy(() => import("../../pages/user/About"));
const Services = lazy(() => import("../../pages/user/Services"));
const ViewDoctor = lazy(() => import("../../pages/user/ViewDoctor"));

function HandleRoute() {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData.user);
  const loading = useSelector((state: RootState) => state.userData.loading);
  console.log("🚀 ~ Router ~ loading:", loading);
  console.log("🚀 ~ Router ~ userData:", userData);
  if (loading === true) {
    <Loader />;
  }

  useEffect(() => {
    dispatch(getUser()).then((res) => {
      console.log("🚀 ~ dispatch ~~ res:", res);
    });
  }, [dispatch]);

  {
    /* doctorprofile routes*/
  }
  if (userData?.role === "doctor") {
    if (userData?.isVerified === true && userData?.isProfile === true) {
      return (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="doctor" element={<DoctorLayout />}>
              <Route path="signup" element={<DoctorOverview />} />
              <Route path="overview" element={<DoctorOverview />} />
              <Route path="appointments" element={<DoctorAppoitnments />} />
              <Route path="patients" element={<DoctorPatients />} />
              <Route path="messages" element={<DoctorMessages />} />
              <Route path="slots" element={<DoctorSlots />} />
              <Route path="profile" element={<DoctorProfile />} />
            </Route>
          </Routes>
        </Suspense>
      );
    } else if (userData?.isProfile === true) {
      return (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/doctor/signup" element={<Navigate to={"/doctor/wait-for-verification"} />} />
            <Route
              path="/doctor/wait-for-verification"
              element={<DoctorWaiting />}
            />
          </Routes>
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/doctor/signup" element={<Navigate to={"/doctor/updateDetails"}/>} />
            <Route path="/doctor/updateDetails" element={<ProfileUpdation />} />
          </Routes>
        </Suspense>
      );
    }
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* authentication routes */}
        <Route path="/login" element={userData ? <Home /> : <Login />} />
        <Route path="/signup" element={userData ? <Home /> : <Signup />} />
        <Route
          path="/doctor/signup"
          element={
            userData?.role === "doctor" && userData?.isVerified === true ? (
              <DoctorOverview />
            ) : (
              <DoctorSignup />
            )
          }
        />

        {/* general Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/list-doctors" element={<Doctors />} />
        <Route path="/userHome" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/our-service" element={<Services />} />
        <Route path="/view-doctor-profile/:id" element={<ViewDoctor />} />
        <Route path="/select-slot/:id" element={<SlotBooking />} />
        <Route path="/doctor-review" element={<DoctorReview />} />
        {/* userprofile routes*/}
        <Route path="view" element={<ProfileLayout />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="favourite-doctors" element={<FavouriteDoctors />} />
          <Route path="prescriptions" element={<UserPrescriptions />} />
          <Route path="chats" element={<UserChats />} />
          <Route path="appointments" element={<UserBookings />} />
        </Route>
        {/* PageNotFound route*/}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default HandleRoute;
