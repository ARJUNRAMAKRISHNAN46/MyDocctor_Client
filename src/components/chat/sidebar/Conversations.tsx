import { useEffect, useState } from "react";
import { useSocketContext } from "../../../contexts/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  listDoctorsForSideBar,
  listUserForSideBar,
} from "../../../redux/actions/AppointmentActions";
import { UserData } from "../../../types/userData";
import Conversation from "./Conversation";

interface ConversationsProps {
  user: string;
}

const Conversations: React.FC<ConversationsProps> = ({ user }) => {
  const { onlineUsers } = useSocketContext();
  const dispatch: AppDispatch = useDispatch();
  const [users, setUsers] = useState<UserData[]>()
  const userData = useSelector((state: RootState) => state.authData.user);

  useEffect(() => {
    if (user === "user") {
      dispatch(listDoctorsForSideBar(userData?._id))
        .then((res) => {
          setUsers(res.payload?.data)
          console.log(res.payload, "user");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (user === "doctor") {
      dispatch(listUserForSideBar(userData?._id))
        .then((res) => {
          setUsers(res.payload?.data)
          console.log(res.payload, "doctor");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="py-2 flex flex-col overflow-auto h-[96vh] border-r border-gray-600">
      {users?.map((conversation, idx) => (
        <Conversation
          key={conversation?._id}
          conversation={conversation}
          lastIdx={idx === onlineUsers.length - 1}
        />
      ))}
    </div>
  );
};

export default Conversations;
