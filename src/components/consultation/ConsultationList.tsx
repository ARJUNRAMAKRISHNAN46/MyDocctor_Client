import React from "react";
import ConsultationItem from "./ConsultationItem";

const users = [
  {
    id: 1,
    name: "patient1",
    consultationMethod: "Video Consultancy",
    date: "12-04-2024",
    profile: "https://i.mydramalist.com/1kymd_5v.jpg",
  },
  {
    id: 2,
    name: "patient1",
    consultationMethod: "Phone Consultancy",
    date: "12-04-2024",
    profile: "https://i.mydramalist.com/ZyyEJ_5v.jpg",
  },
  {
    id: 3,
    name: "patient1",
    consultationMethod: "In-pernal Consultancy",
    date: "12-04-2024",
    profile: "https://i.mydramalist.com/jQQJvv_5v.jpg",
  },
  {
    id: 2,
    name: "patient1",
    consultationMethod: "Phone Consultancy",
    date: "12-04-2024",
    profile: "https://i.mydramalist.com/ZyyEJ_5v.jpg",
  },
  {
    id: 3,
    name: "patient1",
    consultationMethod: "In-pernal Consultancy",
    date: "12-04-2024",
    profile: "https://i.mydramalist.com/jQQJvv_5v.jpg",
  },
];

const ConsultationList: React.FC = () => {
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
          {users.map((consultation) => (
            <ConsultationItem key={consultation.id} {...consultation} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultationList;
