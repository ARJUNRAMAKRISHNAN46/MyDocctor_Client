import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getUser } from "../redux/actions/AuthActions";

const Signup = lazy(() => import("../pages/user/Signup"));
const Login = lazy(() => import("../pages/user/Login"));
const Home = lazy(() => import("../pages/user/Home"));
const DoctorSignup = lazy(() => import("../pages/doctor/DoctorSignup"));
const DoctorOverview = lazy(() => import("./doctor/DoctorOverview"));
const DoctorAppoitnments = lazy(() => import("./doctor/DoctorAppoitnments"));
const DoctorPatients = lazy(() => import("./doctor/DoctorPatients"));
const DoctorCommunityChat = lazy(() => import("./doctor/DoctorCommunityChat"));
const DoctorMessages = lazy(() => import("./doctor/DoctorMessages"));
const DoctorSlots = lazy(() => import("./doctor/DoctorSlots"));
const PageNotFound = lazy(() => import("./common/PageNotFound"));
const DoctorHome = lazy(() => import("../pages/doctor/DoctorHome"));
const AdminHome = lazy(() => import("../pages/admin/AdminHome"));
const ForgotPassword = lazy(() => import("./authentication/ForgotPassword"));
const ResetPassword = lazy(() => import("./authentication/ResetPassword"));
const SlotBooking = lazy(() => import("../pages/user/SlotBooking"));
const ProfileUpdation = lazy(() => import("../pages/doctor/ProfileUpdation"));
const DoctorWaiting = lazy(() => import("../pages/doctor/DoctorWaiting"));
const Doctors = lazy(() => import("../pages/user/Doctors"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));

//======= loading component
import Loader from "./common/Loader";
import VerifyDoctor from "../pages/admin/VerifyDoctor";
import DoctorLayout from "./doctor/DoctorLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminBookings from "./admin/AdminBookings";
import AdminLayout from "./admin/AdminLayout";
import AdminDoctors from "./admin/AdminDoctors";
import AdminPatients from "./admin/AdminPatients";
import AdminSpecialities from "./admin/AdminSpecialities";
import DoctorProfile from "./doctor/DoctorProfile";
import UserBookings from "./user/UserBookings";
import FavouriteDoctors from "./common/FavouriteDoctors";
import UserPrescriptions from "./user/UserPrescriptions";
import UserChats from "./user/UserChats";
import ProfileLayout from "../pages/user/ProfileLayout";
import ViewDoctor from "../pages/user/ViewDoctor";
import DoctorReview from "./user/DoctorReview";
import Services from "../pages/user/Services";
import About from "../pages/user/About";
import Contact from "../pages/user/Contact";
import AdminServices from "./admin/AdminServices";

function Router() {
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
      console.log("🚀 ~ dispatch ~ res:", res);
    });
  }, [dispatch]);

  if (userData === null || userData === undefined || userData?.role === "user") {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* authentication routes */}
          <Route path="/login" element={userData ? <Home /> : <Login />} />
          <Route path="/signup" element={userData ? <Home /> : <Signup />} />

          {/* general Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/list-doctors" element={<Doctors />} />
          <Route path="/userHome" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/our-service" element={<Services />} />
          <Route path="/contact-us" element={<Contact />} />
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
          {/* doctor routers */}
          <Route path="doctor">
            <Route path="appointments" element={<Navigate to={"/"} />} />
            <Route path="patients" element={<Navigate to={"/"} />} />
            <Route path="community-chat" element={<Navigate to={"/"} />} />
            <Route path="messages" element={<Navigate to={"/"} />} />
            <Route path="slots" element={<Navigate to={"/"} />} />
            <Route path="profile" element={<Navigate to={"/"} />} />
          </Route>
          {/* doctor routers */}
          <Route path="admin">
            <Route path="dashboard" element={<Navigate to={"/"} />} />
            <Route path="doctors" element={<Navigate to={"/"} />} />
            <Route path="bookings" element={<Navigate to={"/"} />} />
            <Route path="patients" element={<Navigate to={"/"} />} />
            <Route path="specialities" element={<Navigate to={"/"} />} />
            <Route path="services" element={<Navigate to={"/"} />} />
          </Route>
          {/* PageNotFound route*/}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    );
  }

  if (userData?.role === "user") {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to={"/userHome"} />} />
          <Route
            path="/login"
            element={!userData ? <Login /> : <Navigate to={"/userHome"} />}
          />
          <Route
            path="/signup"
            element={!userData ? <Signup /> : <Navigate to={"/userHome"} />}
          />
          <Route
            path="/userHome"
            element={userData ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route path="/select-slot/:id" element={<SlotBooking />} />
          <Route path="/list-doctors" element={<Doctors />} />
          <Route path="/show-Profile" element={<UserProfile />} />
          <Route path="/list-bookings" element={<UserBookings />} />
          <Route path="/favourite-doctors" element={<FavouriteDoctors />} />
          <Route path="/prescriptions" element={<UserPrescriptions />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    );
  }

  if (userData?.role === "doctor") {
    if (userData?.isVerified === false) {
      if (userData?.isProfile === true) {
        return (
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={"/doctor/wait-for-verification"} />}
              />
              <Route
                path="/doctor/wait-for-verification"
                element={<DoctorWaiting />}
              />
              <Route
                path="/login"
                element={<Navigate to={"/doctor/wait-for-verification"} />}
              />
              <Route
                path="/doctor/signup"
                element={<Navigate to={"/doctor/wait-for-verification"} />}
              />
              <Route
                path="/doctor/updateDetails"
                element={<Navigate to={"/doctor/wait-for-verification"} />}
              />
              <Route
                path="/doctor/doctorHome"
                element={<Navigate to={"/doctor/wait-for-verification"} />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        );
      } else {
        return (
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={"/doctor/updateDetails"} />}
              />
              <Route
                path="/doctor"
                element={<Navigate to={"/doctor/updateDetails"} />}
              />
              <Route
                path="/login"
                element={<Navigate to={"/doctor/updateDetails"} />}
              />
              <Route
                path="/doctor/signup"
                element={<Navigate to={"/doctor/updateDetails"} />}
              />
              <Route
                path="/doctor/updateDetails"
                element={<ProfileUpdation />}
              />
              <Route
                path="/doctor/doctorHome"
                element={<Navigate to={"/doctor/updateDetails"} />}
              />
              <Route
                path="/doctor/wait-for-verification"
                element={<DoctorWaiting />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        );
      }
    } else {
      return (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/login"
              element={<Navigate to={"/doctor/overview"} />}
            />
            <Route
              path="/doctor/signup"
              element={<Navigate to={"/doctor/overview"} />}
            />
            <Route
              path="/doctor/updateDetails"
              element={<Navigate to={"/doctor/overview"} />}
            />
            <Route path="doctor" element={<DoctorLayout />}>
              <Route path="doctorHome" element={<DoctorOverview />} />
              <Route path="overview" element={<DoctorOverview />} />
              <Route path="appointments" element={<DoctorAppoitnments />} />
              <Route path="patients" element={<DoctorPatients />} />
              <Route path="community-chat" element={<DoctorCommunityChat />} />
              <Route path="messages" element={<DoctorMessages />} />
              <Route path="slots" element={<DoctorSlots />} />
              <Route path="profile" element={<DoctorProfile />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
            <Route path="" element={<Navigate to={"/doctor/overview"} />} />
          </Routes>
        </Suspense>
      );
    }
  }

  if (userData?.role === "admin") {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to={"/admin/dashboard"} />} />
          <Route path="/admin/verifyDoctor/:id" element={<VerifyDoctor />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="specialities" element={<AdminSpecialities />} />
            <Route path="services" element={<AdminServices />} />
          </Route>
        </Routes>
      </Suspense>
    );
  }
}

export default Router;
