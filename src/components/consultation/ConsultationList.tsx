import React, { useEffect, useState } from "react";
import ConsultationItem from "./ConsultationItem";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { listUserForSideBar } from "../../redux/actions/AppointmentActions";
import { UserData } from "../../types/userData";

const ConsultationList: React.FC = () => {
  const [patients, setPatients] = useState<UserData[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);

  useEffect(() => {
    dispatch(listUserForSideBar(userData?._id)).then((res) => {
      setPatients(res.payload?.data);
    });
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-white bg-gray-700">
        <thead>
          <tr className="border border-b-gray-500 border-t-0 border-x-0">
            <th className="py-2 px-4 text-left">Profile</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Consultation Method</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          {patients?.map((patient) => (
            <ConsultationItem key={patient?._id} {...patient} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultationList;
