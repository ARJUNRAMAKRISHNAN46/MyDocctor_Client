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
      component: <AdminDashboard />,
    },
    {
      logo: <FaUserDoctor />,
      value: "Doctors",
      component: <AdminDoctors />,
    },
    {
      logo: <IoIosPeople />,
      value: "Patients",
      component: <AdminPatients />,
    },
    {
      logo: <MdOutlineDateRange />,
      value: "Bookings",
      component: <AdminBookings />,
    },
    {
      logo: <MdFolderSpecial />,
      value: "Specialities",
      component: <AdminSpecialities />,
    },
  ];
  const handleItemClick = (component:  JSX.Element) => {
    setSelectedComponent(component);
  };

  return (
    <div className="flex">
      <div style={{ width: "10vw" }}>
        <SidePanel data={data} onItemClick={handleItemClick} />
      </div>
      <div style={{ width: "90vw" }}>
        <Outlet />
      </div>
    </div>
  );
}
