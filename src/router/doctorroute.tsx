import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

const DoctorRoute = ({ element, role }: any): any => {
  const userData = useSelector((state: RootState) => state.userData.user);
  console.log("🚀 ~ DoctorRoute ~ userData:", userData);

  if (!userData && userData?.role !== role) {
    console.log('=================================================>')
    return <Navigate to="/" replace />;
  } else {
    if (!userData?.isProfile) {
      console.log("🚀 ~ DoctorRoute ~ userData.isProfile:", userData?.isProfile);
      return <Navigate to="/doctor/updateDetails" replace />;
    } else if (!userData.isVerified) {
      console.log("🚀 ~ DoctorRoute ~ userData.isVerfied:", userData?.isVerfied);
      return <Navigate to="/doctor/wait-for-verification" replace />;
    } else {
      return element;
    }
  }
};

export default DoctorRoute;
