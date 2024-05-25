import { CgProfile } from "react-icons/cg";
import { Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoIosPeople } from "react-icons/io";
import { DataItem } from "../../types/doctorSidebar";
import { MdOutlineDateRange } from "react-icons/md";
import { BiMessageAltCheck, BiUser } from "react-icons/bi";
import SidePanel from "../common/SidePanel";
import { LuMessagesSquare } from "react-icons/lu";

export default function DoctorLayout() {

  const data: DataItem[] = [{
    logo: <RxDashboard />,
    value: 'Overview',
    component: "/doctor/overview"
  },
  {
    logo: <MdOutlineDateRange />,
    value: 'Appoitnment',
    component: "/doctor/appointments"
  },
  {
    logo: <BiUser />,
    value: 'Patients',
    component: "/doctor/patients"
  },
  {
    logo: <IoIosPeople />,
    value: 'Community Chat',
    component: "/doctor/community-chat"
  },
  {
    logo: <LuMessagesSquare />,
    value: 'Messages',
    component: "/doctor/messages"
  }, {
    logo: <BiMessageAltCheck />,
    value: 'Slots',
    component: "/doctor/slots"
  },{
    logo: <CgProfile />,
    value: 'Profile',
    component: "/doctor/profile"
  }
];

  return (
    <div className="flex">
      <div className="w-1/6">
        <SidePanel data={data} />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
