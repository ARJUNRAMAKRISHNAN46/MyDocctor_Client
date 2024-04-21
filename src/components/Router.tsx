import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "../pages/user/Signup";
import Login from "../pages/user/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "../pages/user/Home";
import DoctorHome from "../pages/doctor/DoctorHome";
import { AppDispatch, RootState } from "../redux/store";
import { getUser } from "../redux/actions/UserActions";

function Router() {
  const dispatch: AppDispatch = useDispatch();
  const doctorData = {};
  const userData = useSelector((state: RootState) => state.userData);
  console.log("🚀 ~ Router ~ userData:================================>", userData);

  useEffect(() => {
    dispatch(getUser())
      .then((res) => {
        console.log("🚀 ~ dispatch ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ res:", err);
      });
  }, [dispatch]);

  return (
    <div>
      <Routes>
        {/* user routes */}
        <Route
          path="/"
          element={
            userData?.user ? (
              <Navigate to={"/home"} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={!userData?.user ? <Login /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/signup"
          element={!userData?.user ? <Signup /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/home"
          element={userData?.user ? <Home /> : <Navigate to="/login" />}
        />
        {/* doctor routes */}
        <Route
          path="/doctor"
          element={
            doctorData ? (
              <Navigate to={"/doctorHome"} />
            ) : (
              <Navigate to={"/doctorLogin"} />
            )
          }
        />
        <Route
          path="/doctorLogin"
          element={
            doctorData ? (
              <Navigate to={"/doctorHome"} />
            ) : (
              <Navigate to={"/doctorLogin"} />
            )
          }
        />
        <Route
          path="/doctorSignup"
          element={
            doctorData ? (
              <Navigate to={"/doctorHome"} />
            ) : (
              <Navigate to={"/doctorLogin"} />
            )
          }
        />
        <Route
          path="/doctorHome"
          element={
            doctorData ? <DoctorHome /> : <Navigate to={"/doctorLogin"} />
          }
        />
        {/* admin routes */}
        <Route />
        <Route />
      </Routes>
    </div>
  );
}

export default Router;
