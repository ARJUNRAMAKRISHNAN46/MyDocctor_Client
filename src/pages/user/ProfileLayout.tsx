
import { NavLink } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../redux/actions/AuthActions";
import { MdLogout } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { DataItem } from "../../types/doctorSidebar";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";

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
      component: "/favourite-doctors",
    },
    {
      logo: <IoIosPeople />,
      value: "Prescriptions",
      component: "/prescriptions",
    },
    {
      logo: <IoIosPeople />,
      value: "Chats",
      component: "/prescriptions",
    },
    {
      logo: <MdOutlineDateRange />,
      value: "Appointments",
      component: "/Appointments",
    },
  ];
  return (
    <div>
        
    </div>
  );
};

export default ProfileLayout;
