import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import ContactHeader from "../../components/contact/ContactHeader";
import ContactLocation from "../../components/contact/ContactLocation";
import ContactSection from "../../components/contact/ContactSection";

function Contact() {
  return (
    <div>
      <Navbar/>
      <ContactHeader />
      <ContactSection />
      <ContactLocation />
      <Footer />
    </div>
  );
}

export default Contact;
