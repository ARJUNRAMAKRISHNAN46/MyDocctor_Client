import { RiArrowRightDoubleLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import appLogo from "../../../src/assets/MyDocctorLogo.png";

function Footer() {
  return (
    <div className=" bg-blue-950 py-8 pb-4 md:px-20">
      <div className="grid md:grid-cols-4">
        <div>
          <img className="object-contain w-56" src={appLogo} alt="" />
          <p className="text-white font-thin text-sm">
            MyDocctor enables patients to book health consultations and
            appointments with their preferred doctor. In addition, mydocctor
            also helps: Doctors manage their appointments and consultations.
            Schedule their availability for easier consultations.
          </p>
        </div>
        <div className="md:ml-14">
          <h1 className="text-xl font-semibold text-white mb-4">
            For Patients
          </h1>
          <div className="flex hover:scale-110">
            <RiArrowRightDoubleLine className="text-white text-2xl" />
            <a className="text-white text-sm font-thin"> Search for Doctors</a>
          </div>
          <div className="flex hover:scale-110">
            <RiArrowRightDoubleLine className="text-white text-2xl" />
            <a className="text-white text-sm font-thin"> Login</a>
          </div>
          <div className="flex hover:scale-110">
            <RiArrowRightDoubleLine className="text-white text-2xl" />
            <a className="text-white text-sm font-thin"> Register</a>
          </div>
          <div className="flex hover:scale-110">
            <RiArrowRightDoubleLine className="text-white text-2xl" />
            <a className="text-white text-sm font-thin"> Booking</a>
          </div>
          <div className="flex hover:scale-110">
            <RiArrowRightDoubleLine className="text-white text-2xl" />
            <a className="text-white text-sm font-thin"> Patient Dashboard</a>
          </div>
        </div>
        <div className="md:ml-14">
          <h1 className="text-xl font-semibold text-white mb-4">For Doctors</h1>
          <div className="flex hover:scale-110">
            <RiArrowRightDoubleLine className="text-white text-2xl" />
            <a className="text-white text-sm font-thin"> Appointments</a>
          </div>
          <div className="flex hover:scale-110">
            <RiArrowRightDoubleLine className="text-white text-2xl" />
            <a className="text-white text-sm font-thin"> Login</a>
          </div>
          <div className="flex hover:scale-110">
            <RiArrowRightDoubleLine className="text-white text-2xl" />
            <a className="text-white text-sm font-thin"> Register</a>
          </div>
          <div className="flex hover:scale-110">
            <RiArrowRightDoubleLine className="text-white text-2xl" />
            <a className="text-white text-sm font-thin"> Doctor Dashboard</a>
          </div>
        </div>
        <div className="md:ml-14">
          <h1 className="text-xl font-semibold text-white mb-4">Contact Us</h1>
          <div className="flex">
            <IoLocationOutline className="text-xl text-white" />
            <div>
              <h1 className="text-white text-sm font-thin">
                4th Gate Avenue, Calicut,{" "}
              </h1>
              <h1 className="text-white text-sm font-thin">
                Kozhikode, Kerala 654987
              </h1>
            </div>
          </div>
          <h1 className="text-white text-sm font-thin mt-4 ml-4">
            +91 75 106 02681
          </h1>
          <h1 className="text-white text-sm font-thin mt-4 ml-4">
            mydocctor@gmail.com
          </h1>
        </div>
      </div>
      <div className="border border-r-0 border-l-0 border-b-0 mt-6 pt-4 md:flex">
        <div className="md:w-[50%]">
          <h1 className="text-center text-white text-sm font-thin">
            Copyright 2024 All Rights Reserved
          </h1>
        </div>
        <div className="md:w-[50%]">
          <h1 className="text-center text-white text-sm font-thin">
            Terms and Conditions Policy
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Footer;
