import React from "react";

function AppAdd() {
  return (
    <div className="flex">
      <div className="md:w-[40%] w-[40%] md:h-[500px]">
        <img
          width={1000}
          src="../../src/assets/images/addImage.png"
          alt="doctor image"
        />
      </div>
      <div className="md:pt-16 pt-4 pl-4 md:w-[50%]">
        <p className="font-bold text-[12px] md:text-[50px] leading-none">
          MyDocctor Your
        </p>
        <p className="font-bold text-[12px] md:text-[50px] leading-none">
          Source for Reliable
        </p>
        <p className="font-bold text-[12px] md:text-[50px] leading-none md:mb-8">
          Medical Information
        </p>
        <p className="text-gray-500 font-semibold text-[4px] leading-none md:text-[20px] mt-1">
          Welcome to MyDocctor, your trusted online resource
        </p>
        <p className="text-gray-500 font-semibold text-[4px] leading-none md:text-[20px]">
          {" "}
          for comprehensive and accurate medical information.{" "}
        </p>
        <p className="text-gray-500 font-semibold text-[4px] leading-none md:text-[20px]">
          Our mission is to empower individuals with the{" "}
        </p>
        <p className="text-gray-500 font-semibold text-[4px] leading-none md:text-[20px]">
          knowledge they need to make informed decisions
        </p>
        <p className="text-gray-500 font-semibold text-[4px] leading-none md:text-[20px] mb-4">
          about their health
        </p>
      </div>
    </div>
  );
}

export default AppAdd;
