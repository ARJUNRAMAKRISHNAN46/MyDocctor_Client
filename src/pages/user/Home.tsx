import Navbar from '../../components/Navbar'
import AppAdd from '../../components/AppAdd'
import Footer from '../../components/Footer'
import Banner from '../../components/Banner'
import Speciality from '../../components/Speciality'
import Reviews from '../../components/Reviews'

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
