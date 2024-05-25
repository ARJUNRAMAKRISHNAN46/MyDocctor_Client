import SidePanel from "../../components/common/SidePanel";
import { RxDashboard } from "react-icons/rx";
import { BiUser } from "react-icons/bi";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { LuMessagesSquare } from "react-icons/lu";
import { BiMessageAltCheck } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { DataItem } from "../../types/doctorSidebar";
import { Outlet } from "react-router-dom";

function DoctorHome() {
  const data: DataItem[] = [
    {
      logo: <RxDashboard />,
      value: "Overview",
      component: "/overview",
    },
    {
      logo: <MdOutlineDateRange />,
      value: "Appoitnment",
      component: "/appointments",
    },
    {
      logo: <BiUser />,
      value: "Patients",
      component: "/patients",
    },
    {
      logo: <IoIosPeople />,
      value: "Community Chat",
      component: "/community-chat",
    },
    {
      logo: <LuMessagesSquare />,
      value: "Messages",
      component: "/messages",
    },
    {
      logo: <BiMessageAltCheck />,
      value: "Slots",
      component: "/slots",
    },
    {
      logo: <CgProfile />,
      value: "Profile",
      component: "/profile",
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

export default DoctorHome;
