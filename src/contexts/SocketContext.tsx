import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import io from "socket.io-client";
import hotToast from "react-hot-toast";
import { BiPhoneCall } from "react-icons/bi";
import { useConversation } from "../zustand/useConversation";

const SOCKET_URL = import.meta.env.VITE_REACT_APP_SOCKET_URL;

interface SocketContextType {
  socket: any | null;
  messages: any[];
  onlineUsers: any[];
}

const socketContext = createContext<SocketContextType>({
  socket: null,
  messages: [],
  onlineUsers: [],
});

export const useSocketContext = (): SocketContextType => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }: any) => {
  const { setAttendCall } = useConversation();
  const [socket, setSocket] = useState<any | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const userId = useSelector((state: RootState) => state.authData.user?._id);

  useEffect(() => {
    if (userId) {
      const newSocket = io(SOCKET_URL, {
        query: {
          userId: userId,
        },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users: any) => {
        setOnlineUsers(users);
      });

      newSocket.on("incomingCall", (data: any) => {

        hotToast(
          (t) => (
            <div className="bg-green-100 h-10 flex justify-center items-center rounded-md gap-3">
              <BiPhoneCall className="h-8 w-8 text-green-500 " />
              <p className="font-medium"> from user</p>
              <p className="text-blue-500">
                <button onClick={attendVideoCall}>Join Now</button>
              </p>
            </div>
          ),
          {
            duration: 10000,
            position: "top-center",
          }
        );
      });
    }
  }, [userId]);

  const attendVideoCall = () => {
    if (userId) {
      const newSocket = io(SOCKET_URL, {
        query: {
          userId: userId,
        },
      });
      console.log("setAttendCall : true", socket);
      newSocket.emit("attendCall", { userId });
      setAttendCall(true);
    }
  };

  const contextValue: SocketContextType = {
    socket,
    onlineUsers,
    messages: [],
  };

  return (
    <socketContext.Provider value={contextValue}>
      {children}
    </socketContext.Provider>
  );
};
