import React, { useEffect, useState } from "react";
import { SidePanelProps } from "../../types/doctorSidebar";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../redux/actions/UserActions";
import { AppDispatch } from "../../redux/store";
import { RootState } from "@reduxjs/toolkit/query";

const SidePanel: React.FC<SidePanelProps> = ({ data, onItemClick }) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData.user);

  useEffect(() => {
    setClickedIndex(0);
    onItemClick(data[0].component)

  }, []);

  const handleLogout = () => {
    dispatch(LogoutUser())
        .then((res) => {
          console.log("🚀 ~ logout ~ dispatch ~ res:", res);
        })
        .catch((err) => {
          console.log("🚀 ~ logout ~ dispatch ~ err:", err);
        });
  }

  

  const handleClick = (index: number) => {
    setClickedIndex(index);
  };

  return (
    <div className="w-[250px] h-[100vh] bg-gray-800">
      <div className="flex justify-center pt-2">
        <div>
          <span className="text-red-600 font-bold text-[10px] md:text-[30px]">
            My
          </span>
          <span className="text-white font-bold text-[10px] md:text-[30px]">
            Doctor
          </span>
        </div>
      </div>
      <div className="flex justify-center rounded-full w-full h-[100px] my-2">
        <img
          src={!userData?.avatar ? '../../src/assets/demoimage.png' : userData?.avatar}
          // src='../../src/assets/demoimage.png'
          className="rounded-full"
          alt="profile image"
        />
      </div>
      <div className="text-center mb-2">
        <h1 className="text-white font-bold text-[20px]">{userData?.name}</h1>
        <h1 className="text-white text-[14px] font-semibold">{userData?.qualification}</h1>
        <h1 className="text-white text-[14px] font-semibold">{userData?.specialization}</h1>
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex items-center font-semibold px-4 rounded-md py-1.5 m-1 ${
            clickedIndex === index ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
          }`}
          onClick={() => {
            handleClick(index);
            onItemClick(item.component);
          }}
        >
          {item?.logo}
          <span
            className={`ml-2 font-semibold${
              clickedIndex === index ? "bg-gray-600 text-white" : "text-gray-200"
            }`}
          >
            {item.value}
          </span>
        </div>
      ))}
      <div onClick={handleLogout} className={`text-gray-200 bg-gray-700 font-semibold pl-10 py-1.5 m-1 rounded-md`}>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SidePanel;
