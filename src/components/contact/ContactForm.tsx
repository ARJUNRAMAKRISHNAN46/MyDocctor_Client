function ContactForm() {
  return (
    <div className="p-10 bg-gray-100 rounded-[5px]">
      <input
        name="name"
        className="w-full border border-gray-300 rounded-[5px] mb-2 px-4 py-2 outline-none"
        type="text"
        placeholder="Enter your name"
      />
      <input
        name="email"
        className="w-full border border-gray-300 rounded-[5px] mb-2 px-4 py-2 outline-none"
        type="text"
        placeholder="Enter your email"
      />
      <input
        name="subject"
        className="w-full border border-gray-300 rounded-[5px] mb-2 px-4 py-2 outline-none"
        type="text"
        placeholder="Enter your subject"
      />
      <textarea
        className="w-full border px-4 border-gray-300 min-h-40 rounded-[5px] mb-2 py-2 outline-none"
        name="message"
        id=""
        placeholder="Enter your message"
      ></textarea>
      <div className="flex justify-center mt-4">
        <button className="text-sm text-white bg-blue-500 px-8 py-1 rounded-full">
          Send Message
        </button>
      </div>
    </div>
  );
}

export default ContactForm;
