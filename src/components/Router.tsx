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
// const LandingPage = lazy(() => import("../pages/common/LandingPage"));
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
import DoctorProfileOnUserSide from "../pages/user/DoctorProfileOnUserSide";

function Router() {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData.user);
  const loading = useSelector((state: RootState) => state.userData.loading);
  console.log("🚀 ~ Router ~ loading:", loading)
  console.log("🚀 ~ Router ~ userData:", userData);
if(loading === true) {
  <Loader/>
}
  useEffect(() => {
    dispatch(getUser())
      .then((res) => {
        console.log("🚀 ~ dispatch ~ res:", res);
      })
  }, [dispatch]);

  if (userData === null || userData === undefined) {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctor/signup" element={<DoctorSignup />} />
          <Route path="/list-doctors" element={<Doctors />} />
          <Route
            path="/userHome"
            element={
              !userData ? <Navigate to={"/"} /> : <Navigate to={"/userHome"} />
            }
          />
          <Route
            path="/doctor/doctorHome"
            element={!userData ? <Login /> : <DoctorHome />}
          />
          <Route path="/doctor/updateDetails" element={<Navigate to={"/"} />} />
          <Route path="/select-slot/:id" element={<SlotBooking />} />
          <Route path="/show-doctor/:id" element={<DoctorProfileOnUserSide />} />
          <Route
            path="/admin/adminHome"
            element={!userData ? <Login /> : <AdminHome />}
          />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/forgotPassword-post" element={<ResetPassword />} />
          <Route path="/doctor/updateDetails" element={<ProfileUpdation />} />
          <Route path="/doctor/doctorHome" element={<Navigate to={"/"} />} />
          <Route path="/show-Profile" element={<UserProfile/>} />
          <Route
            path="/doctor/wait-for-verification"
            element={<Navigate to={"/"} />}
          />
          <Route path="/doctor/overview" element={<Navigate to={"/"} />} />
          <Route
            path="/doctor/doctorOverview"
            element={<Navigate to={"/"} />}
          />
          <Route path="/doctor/appointment" element={<Navigate to={"/"} />} />
          <Route path="/doctor/patients" element={<Navigate to={"/"} />} />
          <Route path="/doctor/communityChat" element={<Navigate to={"/"} />} />
          <Route path="/doctor/messages" element={<Navigate to={"/"} />} />
          <Route path="/doctor/slots" element={<Navigate to={"/"} />} />
          <Route path="/doctor/profile" element={<Navigate to={"/"} />} />
          <Route path="/admin/adminHome" element={<Navigate to={"/"} />} />
          <Route
            path="/admin/verifyDoctor/:id"
            element={<Navigate to={"/"} />}
          />
          {/* <Route path="/" element={<Navigate to={"/admin/adminHome"} />} /> */}
          <Route path="/admin/adminHome" element={<Navigate to={"/"} />} />
          <Route path="/admin/dashboard" element={<Navigate to={"/"} />} />
          <Route path="/admin/doctors" element={<Navigate to={"/"} />} />
          <Route path="/admin/bookings" element={<Navigate to={"/"} />} />
          <Route path="/admin/patients" element={<Navigate to={"/"} />} />
          <Route path="/admin/specialities" element={<Navigate to={"/"} />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Loader />} />
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
          <Route path="/show-Profile" element={<UserProfile/>} />
          <Route path="/list-bookings" element={<UserBookings/>} />
          <Route path="/favourite-doctors" element={<FavouriteDoctors/>} />
          <Route path="/prescriptions" element={<UserPrescriptions/>} />
          <Route path="/show-doctor/:id" element={<DoctorProfileOnUserSide />} />
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
            <Route path="" element={<Navigate to={"/doctor/doctorHome"} />} />
            <Route
              path="/login"
              element={<Navigate to={"/doctor/doctorHome"} />}
            />
            <Route
              path="/doctor/signup"
              element={<Navigate to={"/doctor/doctorHome"} />}
            />
            <Route
              path="/doctor/updateDetails"
              element={<Navigate to={"/doctor/doctorHome"} />}
            />
            <Route path="doctor" element={<DoctorLayout />}>
              <Route path="doctorHome" element={<DoctorOverview />} />
              <Route
                path="overview"
                element={<DoctorOverview />}
              />
              <Route
                path="appointments"
                element={<DoctorAppoitnments />}
              />
              <Route path="patients" element={<DoctorPatients />} />
              <Route
                path="community-chat"
                element={<DoctorCommunityChat />}
              />
              <Route path="messages" element={<DoctorMessages />} />
              <Route path="slots" element={<DoctorSlots />} />
              <Route path="profile" element={<DoctorProfile />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      );
    }
  }

  if (userData?.role === "admin") {
    console.log("hertei sit a")
    return (
      
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to={"/admin/dashboard"}/> } />
          <Route path="/admin/verifyDoctor/:id" element={<VerifyDoctor />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route path="" element={<Navigate to={"/admin/adminHome"} />} />
            <Route path="adminHome" element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="specialities" element={<AdminSpecialities />} />
          </Route>
        </Routes>
      </Suspense>
    );
  }
}

export default Router;
