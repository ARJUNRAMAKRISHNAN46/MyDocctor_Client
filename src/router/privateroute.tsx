// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { RootState } from "../redux/store";

// const PrivateRoute = ({ element, role }: any):any => {
//   const userData = useSelector((state: RootState) => state.userData.user);
//   if (!userData && userData?.role !== role) {
//     return <Navigate to="/" replace />;
//   }else {
//    return element;
//   }
// };

// export default PrivateRoute;


import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

interface PrivateRouteProps {
  element: React.ReactNode;
  role: string;
}

const PrivateRoute = ({ element, role }: PrivateRouteProps) => {
  const userData = useSelector((state: RootState) => state.authData.user);

  if (!userData || userData?.role !== role) {
    return <Navigate to="/" replace />;
  } else {
    return element ? element : <Outlet />;
  }
};

export default PrivateRoute;
