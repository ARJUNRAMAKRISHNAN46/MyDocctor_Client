import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { UserData } from "../../../types/userData";
import { listUsers } from "../../../redux/actions/UserActions";

const ListPatients: React.FC = () => {
  const [doctors, setDoctors] = useState<UserData[]>([]);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers()).then((res) => {
      setDoctors(res.payload?.data);
    });
  }, []);

  return (
    <div className="overflow-x-auto h-[300px] mt-4">
      <table className="min-w-full text-white bg-gray-700">
        <thead>
          <tr className="border border-b-gray-500 border-t-0 border-x-0">
            <th className="py-2 px-4 text-left">Profile</th>
            <th className="py-2 px-4 text-left">Patient Name</th>
            <th className="py-2 px-4 text-left">Mobile Number</th>
            <th className="py-2 px-4 text-left">Country</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr className="border-b border-gray-600 text-gray-300 ita">
              <td className="py-2 px-4">
                <img
                  src={
                    doctor?.profilePhoto || "../../../src/assets/demoimage.jpg"
                  }
                  alt={doctor?.name}
                  className="h-10 w-10 rounded-full"
                />
              </td>
              <td className="py-2 px-4">{doctor?.name}</td>
              <td className="py-2 px-4">
                {doctor?.mobileNumber || "No number"}
              </td>
              <td className="py-2 px-4">{doctor?.country || "Not provided"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPatients;
