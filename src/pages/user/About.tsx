import Achievements from "../../components/about/Achievements";
import MeetOurSpecialist from "../../components/about/MeetOurSpecialist";
import WhatDoctorsDay from "../../components/about/WhatDoctorsDay";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";

function About() {
  return (
    <div>
      <Navbar />
      <Achievements/>
      <WhatDoctorsDay/>
      <MeetOurSpecialist/>
      <Footer/>
    </div>
  );
}

export default About;
