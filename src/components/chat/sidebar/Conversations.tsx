import React, { useEffect, useState } from "react";
import { useSocketContext } from "../../../contexts/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  listDoctorsForSideBar,
  listUserForSideBar,
} from "../../../redux/actions/AppointmentActions";
import { UserData } from "../../../types/userData";
import Conversation from "./Conversation";
import axios from "axios";

interface ConversationsProps {
  user: string;
}

interface UserWithLastMessage extends UserData {
  lastMessage: {
    createdAt: string;
    message: string;
    type: string;
  } | null;
}

const Conversations: React.FC<ConversationsProps> = ({ user }) => {
  const { onlineUsers, socket } = useSocketContext();
  const dispatch: AppDispatch = useDispatch();
  const [users, setUsers] = useState<UserWithLastMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [ss, setss] = useState<boolean>(true);
  const userData = useSelector((state: RootState) => state.authData.user);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res;
        if (user === "user") {
          res = await dispatch(listDoctorsForSideBar(userData?._id));
        } else if (user === "doctor") {
          res = await dispatch(listUserForSideBar(userData?._id));
        }

        // Fetch last message details for each user and sort them by createdAt
        const usersWithLastMessage: UserWithLastMessage[] = await Promise.all(
          res?.payload?.data.map(async (user: UserData) => {
            const lastMessage = await fetchMessageDetails(String(user._id));
            return { ...user, lastMessage };
          })
        );

        const sortedUsers = usersWithLastMessage.sort((a, b) => {
          const dateA = new Date(a.lastMessage?.createdAt || 0).getTime();
          const dateB = new Date(b.lastMessage?.createdAt || 0).getTime();
          return dateB - dateA;
        });

        setUsers(sortedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [socket, dispatch, user, userData, ss]);

  socket?.on("refresh", () => {
    setss(!ss);
  });

  const fetchMessageDetails = async (conversation_id: string) => {
    try {
      const res = await axios.post(
        `https://mydocctor-server-7.onrender.com/chat/api/get-last-message/${userData?._id}`,
        {
          senderId: conversation_id,
        }
      );
      console.log(res.data?.data, " ======================================>");
      return res.data?.data;
    } catch (error) {
      console.error("Error fetching message details:", error);
      return null;
    }
  };

  return (
    <div className="py-2 flex flex-col overflow-auto h-[96vh] border-r border-gray-600">
      {loading ? (
        <div className="flex flex-col gap-4 px-4">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="skeleton h-16 w-full"></div>
          ))}
        </div>
      ) : (
        <div>
          {users.map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              lastMessage={conversation.lastMessage}
              lastIdx={idx === onlineUsers.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Conversations;
