import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateroute";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminBookings from "../components/admin/AdminBookings";
import AdminPatients from "../components/admin/AdminPatients";
import AdminSpecialities from "../components/admin/AdminSpecialities";
import AdminDoctors from "../components/admin/AdminDoctors";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Doctors from "../pages/user/Doctors";
import AdminLayout from "../components/admin/AdminLayout";
import DoctorLayout from "../components/doctor/DoctorLayout";
import DoctorSignup from "../pages/doctor/DoctorSignup";
import DoctorWaiting from "../pages/doctor/DoctorWaiting";
import ProfileUpdation from "../pages/doctor/ProfileUpdation";
import DoctorOverview from "../components/doctor/DoctorOverview";
import DoctorAppoitnments from "../components/doctor/DoctorAppoitnments";
import DoctorPatients from "../components/doctor/DoctorPatients";
import DoctorCommunityChat from "../components/doctor/DoctorCommunityChat";
import DoctorMessages from "../components/doctor/DoctorMessages";
import DoctorSlots from "../components/doctor/DoctorSlots";
import SlotBooking from "../pages/user/SlotBooking";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import DoctorRoute from "./doctorroute";
import LandingPage from "../pages/common/LandingPage";
import Signup from "../pages/user/Signup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getUser } from "../redux/actions/UserActions";

export default function IndexRouter() {
  const userData = useSelector((state: RootState) => state.userData.user);
  console.log("🚀 ~ IndexRouter ~ userData:", userData?.role)
  // useEffect(() => {
  //   if (userData?.role === "doctor") {
      
  //     if (!userData?.isProfile) {
       
  //     } else if (!userData.isVerified) {
  //     }
  //   }
  // }, [userData]);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser())
      .then((res) => {
        console.log("🚀 ~ dispatch ~ router ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ router ~ err:", err);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list-doctors" element={<Doctors />} />
        <Route path="/doctor/signup" element={<DoctorSignup />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            path="dashboard"
            element={<PrivateRoute element={<AdminDashboard />} role="admin" />}
          />
          <Route
            path="booking"
            element={<PrivateRoute element={<AdminBookings />} role="admin" />}
          />
          <Route
            path="patients"
            element={<PrivateRoute element={<AdminPatients />} role="admin" />}
          />
          <Route
            path="specialties"
            element={
              <PrivateRoute element={<AdminSpecialities />} role="admin" />
            }
          />
          <Route
            path="doctors"
            element={<PrivateRoute element={<AdminDoctors />} role="admin" />}
          />
        </Route>
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route
            path="doctorOverview"
            element={<DoctorRoute element={<DoctorOverview />} role="doctor" />}
          />
          <Route
            path="appointment"
            element={
              <DoctorRoute element={<DoctorAppoitnments />} role="doctor" />
            }
          />
          <Route
            path="patients"
            element={<DoctorRoute element={<DoctorPatients />} role="doctor" />}
          />
          <Route
            path="communityChat"
            element={
              <DoctorRoute element={<DoctorCommunityChat />} role="doctor" />
            }
          />
          <Route
            path="messages"
            element={<DoctorRoute element={<DoctorMessages />} role="doctor" />}
          />
          <Route
            path="slots"
            element={<DoctorRoute element={<DoctorSlots />} role="doctor" />}
          />
          <Route
            path="wait-for-verification"
            element={<DoctorRoute element={<DoctorWaiting />} role="doctor" />}
          />
          <Route
            path="updateDetails"
            element={
              <DoctorRoute element={<ProfileUpdation />} role="doctor" />
            }
          />
        </Route>
        <Route
          path="select-slot/:id"
          element={<PrivateRoute element={<SlotBooking />} role="user" />}
        />
        <Route
          path="/userHome"
          element={<PrivateRoute element={<Home />} role="user" />}
        />
      </Routes>
    </Router>
  );
}
