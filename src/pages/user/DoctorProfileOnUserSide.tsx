import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import Reviews from "../../components/common/Reviews";
import ProfileOnUserSide from "../../components/doctor/ProfileOnUserSide";

function DoctorProfileOnUserSide() {
  return (
    <div className="bg-gray-200 md:bg-white">
      <Navbar />
      <ProfileOnUserSide />
      <Reviews />
      <Footer />
    </div>
  );
}

export default DoctorProfileOnUserSide;
