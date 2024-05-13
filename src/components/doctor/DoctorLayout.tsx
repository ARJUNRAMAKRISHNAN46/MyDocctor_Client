import { useState } from "react";
import { Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoIosPeople } from "react-icons/io";
import { DataItem } from "../../types/doctorSidebar";
import { MdOutlineDateRange } from "react-icons/md";
import SidePanel from "../common/SidePanel";
import DoctorOverview from "./DoctorOverview";
import DoctorAppoitnments from "./DoctorAppoitnments";
import { BiMessageAltCheck, BiUser } from "react-icons/bi";
import DoctorPatients from "./DoctorPatients";
import DoctorCommunityChat from "./DoctorCommunityChat";
import { LuMessagesSquare } from "react-icons/lu";
import DoctorMessages from "./DoctorMessages";
import DoctorSlots from "./DoctorSlots";
import { CgProfile } from "react-icons/cg";
import DoctorProfile from "./DoctorProfile";

export default function DoctorLayout() {
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element>();

  const data: DataItem[] = [{
    logo: <RxDashboard />,
    value: 'Overview',
    component: <DoctorOverview/>
  },
  {
    logo: <MdOutlineDateRange />,
    value: 'Appoitnment',
    component: <DoctorAppoitnments/>
  },
  {
    logo: <BiUser />,
    value: 'User',
    component: <DoctorPatients/>
  },
  {
    logo: <IoIosPeople />,
    value: 'Community Chat',
    component: <DoctorCommunityChat/>
  },
  {
    logo: <LuMessagesSquare />,
    value: 'Messages',
    component: <DoctorMessages/>
  }, {
    logo: <BiMessageAltCheck />,
    value: 'Slots',
    component: <DoctorSlots />
  },{
    logo: <CgProfile />,
    value: 'Profile',
    component: <DoctorProfile/>
  }
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
