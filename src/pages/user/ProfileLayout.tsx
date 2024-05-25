import { NavLink, Outlet } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../redux/actions/AuthActions";
import { MdLogout } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { DataItem } from "../../types/doctorSidebar";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

function ProfileLayout() {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(LogoutUser())
      .then((res) => {
        console.log("🚀 ~ logout ~ dispatch ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ logout ~ dispatch ~ err:", err);
      });
  };

  const data: DataItem[] = [
    {
      logo: <RxDashboard />,
      value: "Profile",
      component: "/view/profile",
    },
    {
      logo: <FaUserDoctor />,
      value: "Favourite Doctors",
      component: "/view/favourite-doctors",
    },
    {
      logo: <IoIosPeople />,
      value: "Prescriptions",
      component: "/view/prescriptions",
    },
    {
      logo: <IoIosPeople />,
      value: "Chats",
      component: "/view/chats",
    },
    {
      logo: <MdOutlineDateRange />,
      value: "Appointments",
      component: "/view/appointments",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex bg-gray-200">
        <div className="w-[250px] bg-white pt-10 flex flex-col justify-between">
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
      <Footer/>
    </div>
  );
}

export default ProfileLayout;
