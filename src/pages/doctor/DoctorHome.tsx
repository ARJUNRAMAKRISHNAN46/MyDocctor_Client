import SidePanel from '../../components/common/SidePanel'
import { RxDashboard } from "react-icons/rx";
import { BiUser } from "react-icons/bi";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { LuMessagesSquare } from "react-icons/lu";
import { BiMessageAltCheck } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { DataItem } from '../../types/doctorSidebar';
import DoctorOverview from '../../components/doctor/DoctorOverview';
import { useState } from 'react';
import DoctorAppoitnments from '../../components/doctor/DoctorAppoitnments';
import DoctorPatients from '../../components/doctor/DoctorPatients';
import DoctorCommunityChat from '../../components/doctor/DoctorCommunityChat';
import DoctorMessages from '../../components/doctor/DoctorMessages';
import DoctorSlots from '../../components/doctor/DoctorSlots';
import DoctorProfile from '../../components/doctor/DoctorProfile';

function DoctorHome() {

  const [selectedComponent, setSelectedComponent] = useState('');

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
    component: <DoctorSlots/>
  },{
    logo: <CgProfile />,
    value: 'Profile',
    component: <DoctorProfile/>
  }
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
)
}

export default DoctorHome