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
      <div className="flex">
        <div className="px-12 pt-12">
          <div className="flex justify-center">
            <img
              className="w-[200px] h-[200px] rounded-full"
              src={
                userData?.profilePhoto || "../../../src/assets/demoimage.png"
              }
              alt=""
            />
          </div>
          <div className="flex justify-center my-6">
            <div>
              <button className="text-white text-sm rounded-[3px] font-semibold px-4 py-1 bg-red-600">
                Edit Profile
              </button>
              <button className="text-white text-sm rounded-[3px] font-semibold px-4 py-1 bg-blue-600 ml-6">
                Add Address{" "}
              </button>
            </div>
          </div>
        </div>
        <div className=" pt-16">
          <h1 className="font-bold">
            NAME :{" "}
            <span className="font-semibold text-gray-700 font-serif">
              {userData?.name}
            </span>
          </h1>
          <h1 className="font-bold">
            EMAIL :{" "}
            <span className="font-semibold text-gray-700 font-serif">
              {userData?.email}
            </span>
          </h1>
          <h1 className="font-bold">
            MOBILE NUMBER :{" "}
            <span className="font-semibold text-gray-700 font-serif">
              {userData?.mobileNumber}
            </span>
          </h1>
          <h1 className="font-bold">
            DATE OF BIRTH :{" "}
            <span className="font-semibold text-gray-700 font-serif">
              {userData?.dob || "Not Added"}
            </span>
          </h1>
          <h1 className="font-bold">
            CITY :{" "}
            <span className="font-semibold text-gray-700 font-serif">
              {userData?.city || "Not Added"}
            </span>
          </h1>
          <h1 className="font-bold">
            STATE :{" "}
            <span className="font-semibold text-gray-700 font-serif">
              {userData?.state || "Not Added"}
            </span>
          </h1>
          <h1 className="font-bold">
            COUNTRY :{" "}
            <span className="font-semibold text-gray-700 font-serif">
              {userData?.country || "Not Added"}
            </span>
          </h1>
          <h1 className="font-bold">
            PINCODE :{" "}
            <span className="font-semibold text-gray-700 font-serif">
              {userData?.pincode || "Not Added"}
            </span>
          </h1>
        </div>
      </div>
      <div className="bg-gray-300 h-20 flex items-center justify-center">
        <a
          href="/list-bookings"
          className="bg-gray-600 text-white font-semibold px-4 rounded-[3px] py-1 ml-4"
        >
          Show Bookings
        </a>
        <a
          href="/favourite-doctors"
          className="bg-gray-600 text-white font-semibold px-4 rounded-[3px] py-1 ml-4"
        >
          Favourite Doctors
        </a>
        <a
          href="/prescriptions"
          className="bg-gray-600 text-white font-semibold px-4 rounded-[3px] py-1 ml-4"
        >
          Prescriptions
        </a>
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
