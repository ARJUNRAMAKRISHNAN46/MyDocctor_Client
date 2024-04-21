import React, { useEffect, useState } from "react";
import { SidePanelProps } from "../types/doctorSidebar";
import DoctorOverview from "./DoctorOverview";

const SidePanel: React.FC<SidePanelProps> = ({ data, onItemClick }) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  useEffect(() => {
    setClickedIndex(0);
    onItemClick(<DoctorOverview/>)

  }, []);

  const handleClick = (index: number) => {
    setClickedIndex(index);
  };

  return (
    <div className="w-[220px] h-[100vh] bg-white">
      <div className="flex justify-center pt-2">
        <div>
          <span className="text-red-600 font-bold text-[10px] md:text-[30px]">
            My
          </span>
          <span className="text-gray-950 font-bold text-[10px] md:text-[30px]">
            Doctor
          </span>
        </div>
      </div>
      <div className="flex justify-center rounded-full w-full h-[100px] my-2">
        <img
          src="../../src/assets/1580.png"
          className="rounded-full"
          alt="profile image"
        />
      </div>
      <div className="text-center mb-2">
        <h1 className="font-bold text-[20px]">Sangeetha K P</h1>
        <h1 className="text-[14px] font-semibold">MBBS, MD (OBG), DGO</h1>
        <h1 className="text-[14px] font-semibold">GYNECOLOGIST</h1>
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex items-center font-semibold px-4 rounded-md py-1.5 m-1 ${
            clickedIndex === index ? "bg-gray-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            handleClick(index);
            onItemClick(item.component);
          }}
        >
          {item?.logo}
          <span
            className={`ml-2 text-gray-800 font-semibold${
              clickedIndex === index ? "bg-gray-600 text-white" : ""
            }`}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SidePanel;
