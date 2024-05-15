import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaUserDoctor } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import AdminDashboard from "./AdminDashboard";
import { DataItem } from "../../types/doctorSidebar";
import AdminDoctors from "./AdminDoctors";
import AdminPatients from "./AdminPatients";
import { MdFolderSpecial, MdOutlineDateRange } from "react-icons/md";
import AdminBookings from "./AdminBookings";
import AdminSpecialities from "./AdminSpecialities";
import SidePanel from "../common/SidePanel";

export default function AdminLayout() {
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element>();

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
  ];
  const handleItemClick = (component:  JSX.Element) => {
    setSelectedComponent(component);
  };

  return (
    <div className="flex">
      <div className="w-1/6">
        <SidePanel data={data} onItemClick={handleItemClick} />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
