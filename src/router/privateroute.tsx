import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

const PrivateRoute = ({ element, role }: any):any => {
  const userData = useSelector((state: RootState) => state.userData.user);
  if (!userData && userData?.role !== role) {
    return <Navigate to="/" replace />;
  }else {
   return element;
  }
};

export default PrivateRoute;
