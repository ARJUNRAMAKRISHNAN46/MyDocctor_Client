import SidePanel from "../../components/common/SidePanel";
import { DataItem } from "../../types/doctorSidebar";
import { RxDashboard } from "react-icons/rx";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { MdFolderSpecial } from "react-icons/md";
import { Outlet } from "react-router-dom";

function AdminHome() {
  const data: DataItem[] = [
    {
      logo: <RxDashboard />,
      value: "Dashboard",
      component: "",
    },
    {
      logo: <FaUserDoctor />,
      value: "Doctors",
      component: "",
    },
    {
      logo: <IoIosPeople />,
      value: "Patients",
      component: "",
    },
    {
      logo: <MdOutlineDateRange />,
      value: "Bookings",
      component: "",
    },
    {
      logo: <MdFolderSpecial />,
      value: "Specialities",
      component: "",
    },
  ];

  return (
    <div className="bg-gray-200 w-[100vw] h-[100vh] flex">
      <SidePanel data={data} />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminHome;
