import { useSelector } from "react-redux";
import { UserData } from "../../types/userData";
import { RootState } from "../../redux/store";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

function UserProfile() {
  const userData: UserData = useSelector(
    (state: RootState) => state.userData.user
  );
  return (
    <div>
      <Navbar />
      <div className="h-72 bg-green-600">hello</div>
      <Footer />
    </div>
  );
}

export default UserProfile;
