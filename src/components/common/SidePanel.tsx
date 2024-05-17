import React, { useEffect, useState } from "react";
import { SidePanelProps } from "../../types/doctorSidebar";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../redux/actions/AuthActions";
import { AppDispatch, RootState } from "../../redux/store";
import { NavLink, useNavigate } from "react-router-dom";

const SidePanel: React.FC<SidePanelProps> = ({ data, onItemClick }) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData.user);
  const navigate = useNavigate();

  useEffect(() => {
    setClickedIndex(0);
    // onItemClick(data[0].component)
  }, []);

  const handleLogout = () => {
    dispatch(LogoutUser())
      .then((res) => {
        console.log("🚀 ~ logout ~ dispatch ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ logout ~ dispatch ~ err:", err);
      });
  };

  const handleClick = (index: number, root: string) => {
    navigate(root);
    setClickedIndex(index);
  };

  return (
    <div className="w-full h-[150vh] bg-gray-800">
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
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SidePanel;
