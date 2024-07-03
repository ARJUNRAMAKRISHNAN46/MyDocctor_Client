import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../redux/actions/AuthActions";
import { MdLogout } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { DataItem } from "../../types/doctorSidebar";
import { IoIosPeople } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import Navbar from "../../components/common/Navbar";
import { useSocketContext } from "../../contexts/SocketContext";
import { IoWallet } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { IoIosTime } from "react-icons/io";

function ProfileLayout() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const userData = useSelector((state: RootState) => state.authData.user);

  const handleLogout = () => {
    dispatch(LogoutUser()).then((res) => {
      if (res) socket.emit("disconnec", userData?._id);
    });
    navigate("/");
  };

  const data: DataItem[] = [
    {
      logo: <MdDashboard />,
      value: "Profile",
      component: "/view/profile",
    },
    {
      logo: <FaUserDoctor />,
      value: "Favourite Doctors",
      component: "/view/favourite-doctors",
    },
    {
      logo: <IoMdPhotos />,
      value: "Prescriptions",
      component: "/view/prescriptions",
    },
    {
      logo: <IoIosPeople />,
      value: "Chats",
      component: "/view/chats",
    },
    {
      logo: <IoIosTime />,
      value: "Appointments",
      component: "/view/appointments",
    },
    {
      logo: <IoWallet />,
      value: "Wallet",
      component: "/view/wallet",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex bg-gray-200">
        <div className="w-[250px] bg-white pt-10">
          <div>
            {data.map((item, index) => (
              <NavLink
                to={item.component}
                key={index}
                className={({ isActive }) => {
                  return `flex items-center font-semibold px-4 rounded-md py-1.5 m-1 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-blue-900"
                  }`;
                }}
              >
                {item.logo}
                <span className="ml-2">{item.value}</span>
              </NavLink>
            ))}
          </div>
          <div
            onClick={handleLogout}
            className="text-blue-900 bg-gray-200 font-semibold pl-4 py-1.5 m-1 rounded-md cursor-pointer"
          >
            <span className="flex items-center">
              <MdLogout className="mr-2 text-xl" />
              Logout
            </span>
          </div>
        </div>
        <div className="flex-grow p-4">
          <Outlet />
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default ProfileLayout;
