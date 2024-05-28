import ContactAddress from "./ContactAddress";
import ContactForm from "./ContactForm";

function ContactSection() {
  return (
    <div className="flex px-32 my-10">
      <div className="w-[40%]">
        <ContactAddress />
      </div>
      <div className="w-[60%]">
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactSection;
