import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import io from "socket.io-client";
import hotToast from "react-hot-toast";
import { BiPhoneCall } from "react-icons/bi";

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

const SocketContext = ({ children }: any) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const userId = useSelector((state: RootState) => state.userData.user?._id);

  useEffect(() => {
    if (userId) {
      console.log("This is the socket url: ", SOCKET_URL);
      const newSocket = io(SOCKET_URL, {
        query: {
          userId: userId,
        },
      });

      setSocket(newSocket);
      console.log("socket: ", socket);

      newSocket.on("getOnlineUsers", (users: any) => {
        setOnlineUsers(users);
        console.log("users: ", users);
      });

      newSocket.on("incomingCall", (data: any) => {
        console.log("incoming data", data);

        hotToast(
          (t) => (
            <div className="bg-green-100 h-10 flex justify-center items-center rounded-md gap-3">
              <BiPhoneCall className="h-8 w-8 text-green-500 " />
              <p className="font-medium"> from user</p>
              <p className="text-blue-500">
                <a href="/">join now</a>
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

export default SocketContext;
