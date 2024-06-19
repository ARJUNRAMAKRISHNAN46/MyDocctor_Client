import React, { useEffect, useState } from "react";
import { SidePanelProps } from "../../types/doctorSidebar";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../redux/actions/AuthActions";
import { AppDispatch, RootState } from "../../redux/store";
import { NavLink } from "react-router-dom";
import { useSocketContext } from "../../contexts/SocketContext";

const SidePanel: React.FC<SidePanelProps> = ({ data }) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const { socket } = useSocketContext();
  useEffect(() => {
    setClickedIndex(0);
  }, []);

  const handleLogout = () => {
    dispatch(LogoutUser())
      .then((res) => {
        if(res)
        socket.emit("disconnec", userData?._id)
      });
  };



  return (
    <div className="w-full bg-gray-800">
      <div className="flex justify-center pt-2 mb-6">
        <div>
          <span className="text-red-600 font-bold text-[10px] md:text-[30px]">
            My
          </span>
          <span className="text-white font-bold text-[10px] md:text-[30px]">
            Doctor
          </span>
        </div>
      </div>
      {data.map((item, index) => (
        <NavLink
          to={item?.component}
          key={index}
          className={({ isActive }) => {
            return `flex items-center font-semibold px-4 rounded-md py-1.5 m-1 ${
              isActive ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
            }`;
          }}
        >
          {item?.logo}
          <span className={`ml-2`}>{item.value}</span>
        </NavLink>
      ))}
      <div
        onClick={handleLogout}
        className={`text-gray-200 bg-gray-700 font-semibold pl-10 py-1.5 m-1 rounded-md`}
      >
        <span className="cursor-pointer">Logout</span>
      </div>
    </div>
  );
};

export default SidePanel;
