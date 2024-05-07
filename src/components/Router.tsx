import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "../pages/user/Signup";
import Login from "../pages/user/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "../pages/user/Home";
import { AppDispatch, RootState } from "../redux/store";
import { getUser } from "../redux/actions/UserActions";
import DoctorSignup from "../pages/doctor/DoctorSignup";
import DoctorOverview from "./doctor/DoctorOverview";
import DoctorAppoitnments from "./doctor/DoctorAppoitnments";
import DoctorPatients from "./doctor/DoctorPatients";
import DoctorCommunityChat from "./doctor/DoctorCommunityChat";
import DoctorMessages from "./doctor/DoctorMessages";
import DoctorSlots from "./doctor/DoctorSlots";
import PageNotFound from "./common/PageNotFound";
import DoctorHome from "../pages/doctor/DoctorHome";
import AdminHome from "../pages/admin/AdminHome";
import ForgotPassword from "./authentication/ForgotPassword";
import ResetPassword from "./authentication/ResetPassword";
import LandingPage from "../pages/common/LandingPage";
import SlotBooking from "../pages/user/SlotBooking";
import ProfileUpdation from "../pages/doctor/ProfileUpdation";
import DoctorWaiting from "../pages/doctor/DoctorWaiting";

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
          <Route path="/doctor/updateDetails" element={<Navigate to={'/login'} />} />
          <Route path="/selectSlot" element={<Navigate to={'/login'} />} />
          <Route path="/admin/adminHome" element={!userData ? <Login /> : <AdminHome/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/forgotPassword-post" element={<ResetPassword/>} />
          <Route path="/doctor/updateDetails" element={<ProfileUpdation/> } />
          <Route path="/doctor/doctorHome" element={<Navigate to={'/login'} />} />
          <Route path="/doctor/wait-for-verification" element={<Navigate to={'/login'} />} />
          <Route path="/doctor/doctorHome" element={ <Navigate to={'/login'} />} />
          <Route path="/doctor/doctorOverview" element={ <Navigate to={'/login'} />} />
          <Route path="/doctor/appointment" element={ <Navigate to={'/login'} />} />
          <Route path="/doctor/patients" element={ <Navigate to={'/login'} />} />
          <Route path="/doctor/communityChat" element={ <Navigate to={'/login'} />} />
          <Route path="/doctor/messages" element={ <Navigate to={'/login'} />} />
          <Route path="/doctor/slots" element={ <Navigate to={'/login'} />} />
          <Route path="/admin/adminHome" element={<Navigate to={'/login'} />}/>
          <Route path="/" element={<LandingPage/>} />
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
          <Route path="/selectSlot" element={<SlotBooking />} />
        </Routes>
      </>
    )
  }

  if(userData?.role === 'doctor') {

    if(userData?.isVerified === false) {
      
      
      if(userData?.isProfile === true) {
        return (
          <>
            <Routes>
              <Route path="/" element={<Navigate to={'/doctor/wait-for-verification'} />} />
              <Route path="/doctor/wait-for-verification" element={<DoctorWaiting/>} />
              <Route path="/login" element={<Navigate to={'/doctor/wait-for-verification'} /> } />
              <Route path="/doctor/signup" element={<Navigate to={'/doctor/wait-for-verification'} /> } />
              <Route path="/doctor/updateDetails" element={<Navigate to={'/doctor/wait-for-verification'} /> }/>
              <Route path="/doctor/doctorHome" element={<Navigate to={'/doctor/wait-for-verification'}/>} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </>
          )
        }else {
          return (
            <>
              <Routes>
                <Route path="/" element={<Navigate to={'/doctor/updateDetails'} />} />
                <Route path="/doctor" element={<Navigate to={'/doctor/updateDetails'} />} />
                <Route path="/login" element={<Navigate to={'/doctor/updateDetails'} /> } />
                <Route path="/doctor/signup" element={<Navigate to={'/doctor/updateDetails'} /> } />
                <Route path="/doctor/updateDetails" element={<ProfileUpdation/> } />
                <Route path="/doctor/doctorHome" element={<Navigate to={'/doctor/updateDetails'}/>} />
                <Route path="/doctor/wait-for-verification" element={<DoctorWaiting/>} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </>
            )
      }
      
    } else {
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
