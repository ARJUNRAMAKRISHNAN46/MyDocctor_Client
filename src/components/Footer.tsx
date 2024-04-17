import React from "react";

function Footer() {
  return (
    <div className="bg-gray-900 flex justify-between px-4 py-4 md:p-12 md:h-[300px]">
      <div>
        <h1 className="text-white font-bold md:text-[40px] text-[12px] font-serif mb-1">
          MyDocctor.online
        </h1>
        <p className="text-white md:text-[18px] text-[4px]">
          A website for booking doctors appointnment and
        </p>
        <p className="text-white md:text-[18px] text-[4px]">
          also search for specific services
        </p>
      </div>
      <div>
        <h1 className="text-white md:text-[22px] text-[6px] font-bold">
          Quick Links
        </h1>
        <h1 className="text-white md:text-[18px] text-[4px]">Home</h1>
        <h1 className="text-white md:text-[18px] text-[4px]">Service</h1>
        <h1 className="text-white md:text-[18px] text-[4px]">Appointment</h1>
        <h1 className="text-white md:text-[18px] text-[4px]">Help</h1>
      </div>
      <div>
        <h1 className="text-white md:text-[22px] text-[6px] font-bold">
          Contact us
        </h1>
        <h1 className="text-white md:text-[18px] text-[4px]">Give us a call</h1>
        <h1 className="text-white md:text-[18px] text-[4px]">7510602681</h1>
        <h1 className="text-white md:text-[18px] text-[4px]">
          Send us an email
        </h1>
        <h1 className="text-white md:text-[18px] text-[4px]">
          mydocctor@gmail.com
        </h1>
        <h1 className="text-white md:text-[18px] text-[4px]">
          Visit us in person
        </h1>
        <h1 className="text-white md:text-[18px] text-[4px]">
          East Nadakkavu, Kozhikode
        </h1>
      </div>
    </div>
  );
}

export default Footer;
