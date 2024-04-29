import AppAdd from "../../components/common/AppAdd"
import Banner from "../../components/common/Banner"
import Footer from "../../components/common/Footer"
import Navbar from "../../components/common/Navbar"
import Reviews from "../../components/common/Reviews"
import Speciality from "../../components/common/Speciality"

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
