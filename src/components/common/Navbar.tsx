import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { LogoutUser } from "../../redux/actions/UserActions";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { MdOutlineLocalHospital } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { BiMessageSquareError } from "react-icons/bi";
import { RiShieldUserLine } from "react-icons/ri";

function Navbar() {
  const userData = useSelector((data: RootState) => data.userData);
  console.log(userData, "userdata is here");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };

  const handleselectSlot = () => {
    console.log('clicked');
    
    navigate('/select-slot');
  }

  const handleLogin = async () => {
    try {
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("🚀 ~ handleLogin ~ error:", error);
    }
  };

  return (
    <div>
      <div className="bg-white flex md:h-14 h-10 px-2 items-center md:px-24 justify-between">
        <div className="flex">
          <h1 className="text-red-600 font-bold text-[10px] md:text-2xl">My</h1>
          <h1 className="text-gray-800 font-bold text-[10px] md:text-2xl">
            Docctor
          </h1>
        </div>
        <div className="w-full h-full flex justify-end items-center">
          <button onClick={handleselectSlot} className="border border-red-700 md:p-2 text-[15px] md:block hidden md:rounded-[5px] md:mr-6 text-red-700 font-semibold">
            <div className="flex items-center">
            <SlCalender className="mr-2"/>
            <h1>Book Appointment</h1>
            </div>
          </button>
        </div> 
        <div className="">
          {userData.user ? (
            <button
              onClick={handleClick}
              className="w-[15%] text-[12px] md:text-[14px] md:ml-6"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="w-[15%] text-[12px] md:text-[14px] md:ml-6"
            >
              Login/Signup
            </button>
          )}
        </div>
      </div>
      <div className="md:hidden block flex justify-end px-2">
        <button onClick={handleselectSlot} className="border border-red-700 md:p-2 text-[15px] md:rounded-[5px] md:mr-6 text-red-700 font-semibold">
          Book Appointment
        </button>
      </div>
      <div className=" hidden md:block">
        <div className="bg-gray-200 md:h-10 h-5 flex justify-center">
          <div className="flex items-center">
            <a href="/list-doctors" className="flex md:mx-10 items-center">
            <RiShieldUserLine />
              <h1 className="text-black md:text-sm font-semibold text-[8px] md:mx-2">
                Doctors
              </h1>
            </a>
            <div className="flex md:mx-10 items-center">
              <MdOutlineLocalHospital />
              <h1 className="text-black md:text-sm font-semibold text-[8px] mx-2 md:mx-2">
                Treatments
              </h1>
            </div>
            <div className="flex md:mx-10 items-center">
              <TiMessages />
              <h1 className="text-black md:text-sm font-semibold text-[8px] md:mx-2">
                Ask a Question
              </h1>
            </div>
            <div className="flex md:mx-10 items-center">
              <BiMessageSquareError />
              <h1 className="text-black md:text-sm font-semibold text-[8px] md:mx-2">
                About Us
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
