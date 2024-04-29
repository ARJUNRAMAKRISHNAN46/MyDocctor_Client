import Navbar from '../../components/common/Navbar'
import AppAdd from '../../components/common/AppAdd'
import Footer from '../../components/common/Footer'
import Banner from '../../components/common/Banner'
import Speciality from '../../components/common/Speciality'
import Reviews from '../../components/common/Reviews'

function Home() {
  return (
    <div>
      <Navbar/>
      <AppAdd/>
      <Speciality/>
      <Banner/>
      <Reviews/>
      <Footer/>
    </div>
  )
}

export default Home
