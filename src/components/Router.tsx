import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "../pages/user/Signup";
import Login from "../pages/user/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "../pages/user/Home";
import { AppDispatch, RootState } from "../redux/store";
import { getUser } from "../redux/actions/UserActions";
import DoctorSignup from "../pages/doctor/DoctorSignup";
import DoctorOverview from "./DoctorOverview";
import DoctorAppoitnments from "./DoctorAppoitnments";
import DoctorPatients from "./DoctorPatients";
import DoctorCommunityChat from "./DoctorCommunityChat";
import DoctorMessages from "./DoctorMessages";
import DoctorSlots from "./DoctorSlots";
import PageNotFound from "./PageNotFound";
import DoctorHome from "../pages/doctor/DoctorHome";
import AdminHome from "../pages/admin/AdminHome";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

function Router() {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData.user);
  console.log("🚀 ~ Router ~ userData:", userData)

  useEffect(() => {
    dispatch(getUser())
      .then((res) => {
        console.log("🚀 ~ dispatch ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ res:", err);
      });
  }, [dispatch]);
  

  if(userData === null || userData === undefined) {
    
    return (
      <>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/doctor/signup" element={<DoctorSignup/>} />
          <Route path="/userHome" element={!userData ? <Login/> : <Navigate to={'/userHome'} />} />
          <Route path="/doctor/doctorHome" element={!userData ? <Login /> : <DoctorHome/>} />
          <Route path="/admin/adminHome" element={!userData ? <Login /> : <AdminHome/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
          <Route path="/" element={<Navigate to={'/login'}/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </>
    )
  }

  if(userData?.role === 'user') {
    return (
      <>
        <Routes>
          <Route path="/" element={<Navigate to={'/userHome'} />} />
          <Route path="/login" element={!userData ? <Login/> : <Navigate to={'/userHome'} />} />
          <Route path="/signup" element={!userData ? <Signup/> : <Navigate to={'/userHome'}/> } />
          <Route path="/userHome" element={userData ? <Home/> : <Navigate to={'/login'} /> } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </>
    )
  }

  if(userData?.role === 'doctor') {
    return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={'/doctor/doctorHome'} />} />
        <Route path="/login" element={<Navigate to={'/doctor/doctorHome'} /> } />
        <Route path="/doctor/signup" element={<Navigate to={'/doctor/doctorHome'} /> } />
        <Route path="/doctor/doctorHome" element={<DoctorHome/> } />
        <Route path="/doctor/doctorOverview" element={<DoctorOverview/> } />
        <Route path="/doctor/appointment" element={<DoctorAppoitnments />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
        <Route path="/doctor/communityChat" element={<DoctorCommunityChat />} />
        <Route path="/doctor/messages" element={<DoctorMessages />} />
        <Route path="/doctor/slots" element={<DoctorSlots />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
    )
  }

  if(userData?.role === 'admin') {
    
    return (
      <>
        <Routes>
          <Route path="/" element={<Navigate to={'/admin/adminHome'}/>}/>
          <Route path="/admin/adminHome" element={<AdminHome/>}/>
          <Route path="/login" element={<AdminHome/>}/>
        </Routes>
      </>
    )
  }
}

export default Router;
