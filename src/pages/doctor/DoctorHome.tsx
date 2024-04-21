import SidePanel from '../../components/SidePanel'
import { RxDashboard } from "react-icons/rx";
import { BiUser } from "react-icons/bi";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { LuMessagesSquare } from "react-icons/lu";
import { BiMessageAltCheck } from "react-icons/bi";
import { DataItem } from '../../types/doctorSidebar';
import DoctorOverview from '../../components/DoctorOverview';
import { useState } from 'react';
import DoctorAppoitnments from '../../components/DoctorAppoitnments';
import DoctorPatients from '../../components/DoctorPatients';
import DoctorCommunityChat from '../../components/DoctorCommunityChat';
import DoctorMessages from '../../components/DoctorMessages';
import DoctorSlots from '../../components/DoctorSlots';

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