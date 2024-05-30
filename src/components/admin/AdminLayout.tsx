import { Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaUserDoctor } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { DataItem } from "../../types/doctorSidebar";
import { MdFolderSpecial, MdOutlineDateRange } from "react-icons/md";
import { MdOutlineMiscellaneousServices } from "react-icons/md";

import SidePanel from "../common/SidePanel";

export default function AdminLayout() {
  const data: DataItem[] = [
    {
      logo: <RxDashboard />,
      value: "Dashboard",
      component: "/admin/dashboard",
    },
    {
      logo: <FaUserDoctor />,
      value: "Doctors",
      component: "/admin/doctors",
    },
    {
      logo: <IoIosPeople />,
      value: "Patients",
      component: "/admin/patients",
    },
    {
      logo: <MdOutlineDateRange />,
      value: "Bookings",
      component: "/admin/bookings",
    },
    {
      logo: <MdFolderSpecial />,
      value: "Specialities",
      component: "/admin/specialities",
    },
    {
      logo: <MdOutlineMiscellaneousServices />,
      value: "Services",
      component: "/admin/services",
    },
  ];

  return (
    <div className="flex">
      <div className="w-1/6">
        <SidePanel data={data} />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
