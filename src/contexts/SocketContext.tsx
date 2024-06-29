import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import io from "socket.io-client";
import { toast } from "react-hot-toast";

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

      newSocket.on('incomingCall', (data) => {
        console.log('Incoming call:', data);
        toast((t) => (
          <div className="bg-green-100 p-4 rounded-md">
            <p className="font-medium">Incoming call</p>
            <div className="mt-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => {
                  window.location.href = data.link;
                  toast.dismiss(t.id);
                }}
              >
                Join
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => toast.dismiss(t.id)}
              >
                Decline
              </button>
            </div>
          </div>
        ), {
          duration: 20000,
          position: 'top-right',
        });
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
