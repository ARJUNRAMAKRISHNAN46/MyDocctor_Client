import DoctorsBanner from '../../components/common/DoctorsBanner'
import Filter from '../../components/common/Filter'
import Footer from '../../components/common/Footer'
import ListDoctors from '../../components/common/ListDoctors'
import Navbar from '../../components/common/Navbar'
import PositiveThoughts from '../../components/common/PositiveThoughts'

function Doctors() {
  return (
    <div className='bg-gray-100'>
      <Navbar/>
      <Filter/>
      <ListDoctors/>
      <DoctorsBanner/>
      <PositiveThoughts/>
      <Footer/>
    </div>
  )
}

export default Doctors