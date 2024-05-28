import Footer from "../../components/common/Footer";
import ListDoctors from "../../components/common/ListDoctors";
import Navbar from "../../components/common/Navbar";
import DoctorLists from "../../components/user/DoctorLists";
import Filter from "../../components/user/Filter";

function Doctors() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <DoctorLists />
      <div className="flex">
        <div>
          <Filter />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Doctors;
