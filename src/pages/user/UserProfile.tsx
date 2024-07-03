import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "../../types/userData";
import { AppDispatch, RootState } from "../../redux/store";
import { imageUpload } from "../../utils/UploadImage";
import { updateProfile } from "../../redux/actions/UserActions";
import { FaUpload } from "react-icons/fa6";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../redux/actions/AuthActions";
import { walletHistory } from "../../redux/actions/AppointmentActions";
import { WalletData } from "../../types/Wallet";

function UserProfile() {
  const userData: UserData = useSelector(
    (state: RootState) => state.authData.user
  );
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [wallet, setWallet] = useState<WalletData[]>([]);
 
  const [profileData, setProfileData] = useState({
    _id: userData?._id || "",
    profilePhoto: userData?.profilePhoto || "",
    name: userData?.name || "",
    email: userData?.email || "",
    mobileNumber: userData?.mobileNumber || "",
    city: userData?.city || "",
    state: userData?.state || "",
    country: userData?.country || "",
    pincode: userData?.pincode || "",
  });

  useEffect(() => {
    dispatch(getUser()).then((res) => {
      console.log("🚀 ~ dispatch ~ res:", res);
    });
    dispatch(walletHistory(String(userData?._id))).then((res) => {
      setWallet(res.payload.data);
    });
  }, [loading, dispatch]);

  const [profileImage, setProfileImage] = useState(
    userData?.profilePhoto || ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    const file = e.target.files?.[0];
    const image = await imageUpload(file);
    console.log("🚀 ~ handleImageChange ~ image:", image);
    if (image) {
      setProfileImage(image);
    }
  };
  
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    console.log("Profile Data Submitted: ", { ...profileData, profileImage });
    profileData.profilePhoto = profileImage;

    dispatch(updateProfile(profileData)).then((res) => {
      console.log("🚀 ~ dispatch ~ res:", res);
      navigate("/view/profile");
    });
  };

  let sum = 0;
  wallet.forEach((x) => {
    sum += parseFloat(x.amount);
  });

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row md:space-x-6 p-5">
          <div className="flex flex-col items-center md:w-1/3 p-5 border-b md:border-b-0 md:border-r">
            <img
              className="rounded-full w-32 h-32 mt-5"
              src={
                profileImage
                  ? profileImage
                  : "../../../src/assets/demoimage.jpg"
              }
              alt="Profile"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />
            <button
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none"
              onClick={handleButtonClick}
            >
              <FaUpload className="w-32  bg-white rounded-full" size={20} />
            </button>
            <span className="font-bold mt-3">{profileData.name}</span>
            <span className="text-gray-600">{profileData.email}</span>
          </div>
          <div className="md:w-2/3 p-5">
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-4">Profile Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-2 border rounded bg-white"
                    placeholder="Enter your name"
                    value={profileData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Email ID</label>
                  <input
                    type="text"
                    name="email"
                    className="w-full p-2 border rounded bg-white"
                    placeholder="Enter email id"
                    value={profileData.email}
                    onChange={handleChange}
                    readOnly={true}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    className="w-full p-2 border rounded bg-white"
                    placeholder="Enter phone number"
                    value={profileData.mobileNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    className="w-full p-2 border rounded bg-white"
                    placeholder="Enter city"
                    value={profileData.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    className="w-full p-2 border rounded bg-white"
                    placeholder="Enter state"
                    value={profileData.state}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Country</label>
                  <input
                    type="text"
                    name="country"
                    className="w-full p-2 border rounded bg-white"
                    placeholder="Enter country"
                    value={profileData.country}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    className="w-full p-2 border rounded bg-white"
                    placeholder="Enter pincode"
                    value={profileData.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
