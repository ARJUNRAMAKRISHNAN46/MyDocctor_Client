import { FaLocationArrow } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";

function ContactAddress() {
  return (
    <div className="bg-gray-100 mx-4 p-6 rounded-[5px]">
      <div className="flex">
        <div>
          <div className="bg-gray-300 p-2 rounded-full">
            <FaLocationArrow />
          </div>
        </div>
        <div className="ml-4">
          <h1 className="font-semibold">Location :</h1>
          <p className="text-gray-600">4th Gate Avenue, Calicut, </p>
          <p className="text-gray-600">Kozhikode, Kerala 654987</p>
        </div>
      </div>
      <div className="flex mt-4">
        <div>
          <div className="bg-gray-300 p-2 rounded-full">
            <MdEmail />
          </div>
        </div>
        <div className="ml-4">
          <h1 className="font-semibold">Email :</h1>
          <p className="text-gray-600">mydocctor@gmail.com</p>
        </div>
      </div>
      <div className="flex mt-6">
        <div>
          <div className="bg-gray-300 p-2 rounded-full">
            <IoCall />
          </div>
        </div>
        <div className="ml-4">
          <h1 className="font-semibold">Call :</h1>
          <p className="text-gray-600">+91 75 106 02681</p>
        </div>
      </div>
    </div>
  );
}

export default ContactAddress;
