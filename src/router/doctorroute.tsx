import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

const DoctorRoute = ({ element, role }: any):any => {
  const userData = useSelector((state: RootState) => state.userData.user);
  if (!userData && userData?.role !== role) {
    return <Navigate to="/" replace />;
  }else {
    if(!userData?.isProfile){
        return <Navigate to="/doctor/updateDetails" replace />
    }else if(!userData.isVerified){
        return <Navigate to="/doctor/wait-for-verification" replace />
    }else{
        return element;
    }
  }
};

export default DoctorRoute;
