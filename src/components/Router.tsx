import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "../pages/patient/Signup";
import Login from "../pages/patient/Login";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Home from "../pages/patient/Home";
import { UserData } from "../../redux/store";
import { RootState } from "../../redux/store";

function Router() {
  const dispatch = useDispatch();
  const userData = useSelector((data: RootState) => data.userData);
  
  useEffect(() => {
    axios
      .get<UserData>("http://localhost:8080/auth/isExist",{ withCredentials: true })
      .then((response) => {
        dispatch({ type: 'SET_USER_DATA',payload: response.data});
        console.log();
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [dispatch]);
  
  console.log(userData, '<--------------userData--------------->');
  return (
    <div>
      <Routes>
        <Route path="/" element={ userData ? <Navigate to={'/home'} /> : <Navigate to={'/login'}/>} />
        <Route path="/login" element={!userData ? <Login/> : <Navigate to={'/home'}/>} />
        <Route path="/signup" element={!userData ? <Signup/> : <Navigate to={'/home'}/>} />
        {/* <Route path="/home" element={<Home/>}/> */}
        <Route path='/home' element={userData ? <Home />:<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default Router;
