import AppAdd from "../components/AppAdd"
import Banner from "../components/Banner"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Reviews from "../components/Reviews"
import Speciality from "../components/Speciality"

function LandingPage() {
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

export default LandingPage
