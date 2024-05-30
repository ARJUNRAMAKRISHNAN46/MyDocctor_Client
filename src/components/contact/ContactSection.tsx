import ContactAddress from "./ContactAddress";
import ContactForm from "./ContactForm";

function ContactSection() {
  return (
    <div className="grid md:grid-cols-2 md:px-32 my-10">
      <div className="md:w-[40%]">
        <ContactAddress />
      </div>
      <div className="md:w-[60%]">
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactSection;
