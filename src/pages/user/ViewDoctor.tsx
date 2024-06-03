
import Navbar from '../../components/common/Navbar'
import DoctorProfile from '../../components/user/DoctorProfile'
import DoctorReview from '../../components/user/DoctorReview'
import Footer from '../../components/common/Footer'

function ViewDoctor() {
  return (
    <div className='bg-white'>
      <Navbar/>
      <DoctorProfile/>
      <DoctorReview/>
      <Footer/>
    </div>
  )
}

export default ViewDoctor
