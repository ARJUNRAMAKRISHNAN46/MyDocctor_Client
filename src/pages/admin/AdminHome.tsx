import { useState } from "react";
import SidePanel from "../../components/SidePanel";
import { DataItem } from "../../types/doctorSidebar";
import { RxDashboard } from "react-icons/rx";
import { BiUser } from "react-icons/bi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { MdFolderSpecial } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import AdminDashboard from "../../components/AdminDashboard";
import AdminDoctors from "../../components/AdminDoctors";
import AdminPatients from "../../components/AdminPatients";
import AdminBookings from "../../components/AdminBookings";
import AdminSpecialities from "../../components/AdminSpecialities";

function AdminHome() {
  const [selectedComponent, setSelectedComponent] = useState("");

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

  const handleItemClick = (component: string) => {
    setSelectedComponent(component);
  };

  return (
    <div className='bg-gray-200 w-[100vw] h-[100vh] flex'>
    <SidePanel data={data} onItemClick={handleItemClick} />
    <div>
      {selectedComponent && selectedComponent}
    </div>
  </div>
  );
}

export default AdminHome;
