import ContactAddress from "./ContactAddress";
import ContactForm from "./ContactForm";

function ContactSection() {
  return (
    <div className="grid md:grid-cols-2 md:px-32 py-10 bg-white">
      <div className="">
        <ContactAddress />
      </div>
      <div className="">
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactSection;
