import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { Suspense, lazy, useEffect } from "react";
import { getUser } from "../../redux/actions/AuthActions";
import { Route, Routes } from "react-router-dom";
import SlotBooking from "../../pages/user/SlotBooking";
import DoctorReview from "../user/DoctorReview";
import UserProfile from "../../pages/user/UserProfile";
import ProfileLayout from "../../pages/user/ProfileLayout";

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

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={userData ? <Home /> : <Login />} />
        <Route path="/signup" element={userData ? <Home /> : <Signup />} />
        <Route path="/list-doctors" element={<Doctors />} />
        <Route path="/userHome" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/our-service" element={<Services />} />
        <Route path="/view-doctor-profile/:id" element={<ViewDoctor />} />
        <Route path="/select-slot/:id" element={<SlotBooking />} />
        <Route path="/doctor-review" element={<DoctorReview />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="view" element={<ProfileLayout />}>
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default HandleRoute;
