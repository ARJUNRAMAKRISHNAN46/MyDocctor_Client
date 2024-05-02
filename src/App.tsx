import "./App.css";
import Router from './components/Router'
import DoctorProfileOnUserSide from "./pages/user/DoctorProfileOnUserSide";
import Doctors from "./pages/user/Doctors";
import Home from "./pages/user/Home";

function App() {
  return (
    <>
      {/* <Router/> */}
      {/* <Doctors/> */}
      <DoctorProfileOnUserSide/>
      {/* <Home/> */}
    </>
  );
}

export default App;
