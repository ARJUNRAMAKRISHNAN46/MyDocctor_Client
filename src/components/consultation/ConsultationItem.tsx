import React from 'react';
import { UserData } from '../../types/userData';
import { useNavigate } from 'react-router-dom';

const ConsultationItem: React.FC<UserData> = ({ profilePhoto, name, mobileNumber, country }) => {
  const navigate = useNavigate();
  const goToMessage = () => {
    navigate("/doctor/messages")
  }
  return (
    <tr className="border-b border-gray-600 text-gray-300 ita">
      <td className="py-2 px-4">
        <img src={profilePhoto || "../../../src/assets/demoimage.jpg"} alt={name} className="h-10 w-10 rounded-full" />
      </td>
      <td className="py-2 px-4">{name}</td>
      <td className="py-2 px-4">{mobileNumber || "No number"}</td>
      <td className="py-2 px-4">{country || "Not provided"}</td>
      <td className="py-2 px-4 flex space-x-2">
        <button onClick={goToMessage} className="bg-blue-500 text-white px-3 py-1 rounded">Message</button>
      </td>
    </tr>
  );
};

export default ConsultationItem;
