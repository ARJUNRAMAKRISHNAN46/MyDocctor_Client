import "./App.css";
import Router from "./components/Router";
import HandleRoute from "./components/common/HandleRoute";
import DoctorAvailibility from "./components/user/DoctorAvailability";
import About from "./pages/user/About";
import Doctors from "./pages/user/Doctors";
import Services from "./pages/user/Services";
import SlotBooking from "./pages/user/SlotBooking";

function App() {
  return (
    <>
      {/* <Router /> */}
      <HandleRoute/>
    </>
  );
}

export default App;
