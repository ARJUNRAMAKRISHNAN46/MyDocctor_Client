import { useState } from "react";
import SidePanel from "../../components/SidePanel";
import { DataItem } from "../../types/doctorSidebar";
import { RxDashboard } from "react-icons/rx";
import { BiUser } from "react-icons/bi";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { LuMessagesSquare } from "react-icons/lu";
import { BiMessageAltCheck } from "react-icons/bi";

function AdminHome() {
  const [selectedComponent, setSelectedComponent] = useState("");

  const data: DataItem[] = [
    {
      logo: <RxDashboard />,
      value: "Overview",
      component: <DoctorOverview />,
    },
    {
      logo: <MdOutlineDateRange />,
      value: "Appoitnment",
      component: <DoctorAppoitnments />,
    },
    {
      logo: <BiUser />,
      value: "User",
      component: <DoctorPatients />,
    },
    {
      logo: <IoIosPeople />,
      value: "Community Chat",
      component: <DoctorCommunityChat />,
    },
    {
      logo: <LuMessagesSquare />,
      value: "Messages",
      component: <DoctorMessages />,
    },
    {
      logo: <BiMessageAltCheck />,
      value: "Slots",
      component: <DoctorSlots />,
    },
  ];

  const handleItemClick = (component: string) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      <SidePanel data={data} onItemClick={handleItemClick} />
    </div>
  );
}

export default AdminHome;
