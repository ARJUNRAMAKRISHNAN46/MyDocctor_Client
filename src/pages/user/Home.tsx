import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import AppBanner from '../../components/common/AppBanner'
import WhyChooseUs from '../../components/common/WhyChooseUs'
import Service from '../../components/common/Servieces'
import ClinicAndSpecialities from '../../components/common/ClinicsAndSpecialities'

function Home() {
  return (
    <div>
      <Navbar/>
      <AppBanner/>
      <WhyChooseUs/>
      <Service/>
      <ClinicAndSpecialities/>
      <Footer/>
    </div>
  )
}

export default Home
