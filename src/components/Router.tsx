import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getUser } from "../redux/actions/AuthActions";

const Signup = lazy(() => import("../pages/user/Signup"));
const Login = lazy(() => import("../pages/user/Login"));
const Home = lazy(() => import("../pages/user/Home"))
const DoctorSignup = lazy(() => import("../pages/doctor/DoctorSignup"));
const DoctorOverview = lazy(() => import("./doctor/DoctorOverview"))
const DoctorAppoitnments = lazy(() => import("./doctor/DoctorAppoitnments"))
const DoctorPatients = lazy(() => import("./doctor/DoctorPatients"))
const DoctorCommunityChat = lazy(() => import("./doctor/DoctorCommunityChat"))
const DoctorMessages = lazy(() => import("./doctor/DoctorMessages"))
const DoctorSlots = lazy(() => import("./doctor/DoctorSlots"))
const PageNotFound = lazy(() => import("./common/PageNotFound"))
const DoctorHome = lazy(() => import("../pages/doctor/DoctorHome"))
const AdminHome = lazy(() => import("../pages/admin/AdminHome"))
const ForgotPassword = lazy(() => import("./authentication/ForgotPassword"))
const ResetPassword = lazy(() => import("./authentication/ResetPassword"))
const LandingPage = lazy(() => import("../pages/common/LandingPage"))
const SlotBooking = lazy(() => import("../pages/user/SlotBooking"))
const ProfileUpdation = lazy(() => import("../pages/doctor/ProfileUpdation"))
const DoctorWaiting = lazy(() => import("../pages/doctor/DoctorWaiting"))
const Doctors = lazy(() => import("../pages/user/Doctors"))

//======= loading component
import Loader from './common/Loader';
import VerifyDoctor from "../pages/admin/VerifyDoctor";

function Router() {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData.user);
  // const navigate = useNavigate()
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
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/doctor/signup" element={<DoctorSignup/>} />
          <Route path="/userHome" element={!userData ? <Navigate to={'/'}/> : <Navigate to={'/userHome'} />} />
          <Route path="/doctor/doctorHome" element={!userData ? <Login /> : <DoctorHome/>} />
          <Route path="/doctor/updateDetails" element={<Navigate to={'/'} />} />
          <Route path="/select-slot/:id" element={<SlotBooking />} />
          <Route path="/list-doctors" element={<Doctors />} />
          <Route path="/admin/adminHome" element={!userData ? <Login /> : <AdminHome/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/forgotPassword-post" element={<ResetPassword/>} />
          <Route path="/doctor/updateDetails" element={<ProfileUpdation/> } />
          <Route path="/doctor/doctorHome" element={<Navigate to={'/'} />} />
          <Route path="/doctor/wait-for-verification" element={<Navigate to={'/'} />} />
          <Route path="/doctor/doctorHome" element={ <Navigate to={'/'} />} />
          <Route path="/doctor/doctorOverview" element={ <Navigate to={'/'} />} />
          <Route path="/doctor/appointment" element={ <Navigate to={'/'} />} />
          <Route path="/doctor/patients" element={ <Navigate to={'/'} />} />
          <Route path="/doctor/communityChat" element={ <Navigate to={'/'} />} />
          <Route path="/doctor/messages" element={ <Navigate to={'/'} />} />
          <Route path="/doctor/slots" element={ <Navigate to={'/'} />} />
          <Route path="/admin/adminHome" element={<Navigate to={'/'} />}/>
          <Route path="/admin/verifyDoctor/:id" element={<Navigate to={'/'} />}/>
          <Route path="/" element={<LandingPage/>} />
          <Route path="*" element={<Loader />} />
        </Routes>
      </Suspense>
    )
  }

  if(userData?.role === 'user') {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to={'/userHome'} />} />
          <Route path="/login" element={!userData ? <Login/> : <Navigate to={'/userHome'} />} />
          <Route path="/signup" element={!userData ? <Signup/> : <Navigate to={'/userHome'}/> } />
          <Route path="/userHome" element={userData ? <Home/> : <Navigate to={'/login'} /> } />
          <Route path="/select-slot/:id" element={<SlotBooking />} />
          <Route path="/list-doctors" element={<Doctors />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    )
  }

  if(userData?.role === 'doctor') {
    if(userData?.isVerified === false) {
      if(userData?.isProfile === true) {
        return (
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Navigate to={'/doctor/wait-for-verification'} />} />
              <Route path="/doctor/wait-for-verification" element={<DoctorWaiting/>} />
              <Route path="/login" element={<Navigate to={'/doctor/wait-for-verification'} /> } />
              <Route path="/doctor/signup" element={<Navigate to={'/doctor/wait-for-verification'} /> } />
              <Route path="/doctor/updateDetails" element={<Navigate to={'/doctor/wait-for-verification'} /> }/>
              <Route path="/doctor/doctorHome" element={<Navigate to={'/doctor/wait-for-verification'}/>} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
          )
        }else {
          return (
            <Suspense fallback={<Loader />}>
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
            </Suspense>
            )
      }
      
    } else {
      return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to={'/doctor/doctorHome'} />} />
          <Route path="/login" element={<Navigate to={'/doctor/doctorHome'} /> } />
          <Route path="/doctor/signup" element={<Navigate to={'/doctor/doctorHome'} /> } />
          <Route path="/doctor/updateDetails" element={<Navigate to={'/doctor/doctorHome'} /> } />
          <Route path="/doctor/doctorHome" element={<DoctorHome/> } />
          <Route path="/doctor/doctorOverview" element={<DoctorOverview/> } />
          <Route path="/doctor/appointment" element={<DoctorAppoitnments />} />
          <Route path="/doctor/patients" element={<DoctorPatients />} />
          <Route path="/doctor/communityChat" element={<DoctorCommunityChat />} />
          <Route path="/doctor/messages" element={<DoctorMessages />} />
          <Route path="/doctor/slots" element={<DoctorSlots />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      )
    }
  }

  if(userData?.role === 'admin') {
    
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to={'/admin/adminHome'}/>}/>
          <Route path="/admin/adminHome" element={<AdminHome/>}/>
          <Route path="/login" element={<AdminHome/>}/>
          <Route path="/admin/verifyDoctor/:id" element={<VerifyDoctor/>}/>
        </Routes>
      </Suspense>
    )
  }
}

export default Router;
