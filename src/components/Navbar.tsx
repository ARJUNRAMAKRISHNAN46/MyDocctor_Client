import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { LogoutUser } from "../redux/actions/UserActions";

function Navbar() {
  const userData = useSelector((data: RootState) => data.userData);
  console.log(userData, "userdata is here");
  const dispatch: AppDispatch = useDispatch();

  const handleClick = async () => {
    try {
      console.log("submitted");

      dispatch(LogoutUser())
        .then((res) => {
          console.log("🚀 ~ logout ~ dispatch ~ res:", res);
        })
        .catch((err) => {
          console.log("🚀 ~ logout ~ dispatch ~ err:", err);
        });
      // const response = await axios.get(
      //   `http://localhost:8080/auth/logout`,
      //   { withCredentials: true }
      // );

      // if (response.status === 200) {
      //   dispatch({ type: 'SET_USER_DATA',payload: ''});
      //   console.log("routing to home page----------------->", response.status);
      //   navigate('/login');
      // }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };

  return (
    <div>
      <div className="bg-gray-800 flex md:h-24 h-10 px-2 items-center md:px-8 justify-between">
        <div className="flex">
          <h1 className="text-red-600 font-bold text-[10px] md:text-3xl">My</h1>
          <h1 className="text-white font-bold text-[10px] md:text-3xl">
            Doctor
          </h1>
        </div>
        <input
          className="bg-gray-700 text-gray-400 placeholder-gray-200 md:text-xl text-[8px] px-2 py-1 focus:outline-none md:w-[700px] md:h-14 md:px-8 rounded-full "
          type="text"
          placeholder="Search Specialists, Doctors, Hospitals, Clinics, Labs"
        />
        {userData ? (
          <button
            onClick={handleClick}
            className="bg-gray-700 border-0 md:text-xl text-[8px] px-2 py-1 rounded-full md:px-8 md:py-2 md:h-14 text-gray-300 md:font-bold"
          >
            Logout
          </button>
        ) : (
          <button className="bg-gray-700 border-0 md:text-xl text-[8px] px-2 py-1 rounded-full md:px-8 md:py-2 md:h-14 text-gray-300 md:font-bold">
            Login / Signup
          </button>
        )}
      </div>
      <div className="bg-gray-900 md:h-10 h-5 flex justify-center">
        <div className="flex items-center">
          <h1 className="text-white md:text-lg text-[8px] mx-2 md:mx-10">
            Home
          </h1>
          <h1 className="text-white md:text-lg text-[8px] mx-2 md:mx-10">
            Doctors
          </h1>
          <h1 className="text-white md:text-lg text-[8px] mx-2 md:mx-10">
            Hospitals
          </h1>
          <h1 className="text-white md:text-lg text-[8px] mx-2 md:mx-10">
            Clinics
          </h1>
          <h1 className="text-white md:text-lg text-[8px] mx-2 md:mx-10">
            Labs
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
