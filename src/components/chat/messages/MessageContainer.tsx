import { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useConversation } from "../../../zustand/useConversation";
import { CiMenuKebab } from "react-icons/ci";
import { IoVideocam } from "react-icons/io5";
import { useSocketContext } from "../../../contexts/SocketContext";
import { GoDotFill } from "react-icons/go";

function MessageContainer() {
  const { selectedConversation, setMessages } = useConversation() as any;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation?._id);

  useEffect(() => {
  }, [setMessages]);

  const handleVideoCall = () => {
  };

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="flex-col flex justify-between h-[96vh]">
          <div className="bg-gray-700 px-4 py-2 mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="w-12 h-12 rounded-full object-contain"
                src={
                  selectedConversation?.profilePhoto ||
                  "../../../../src/assets/demoimage.jpg"
                }
                alt="profileImage"
              />
              <div className="ml-4 flex flex-col">
                <span className="text-white font-bold">
                  {selectedConversation?.name}
                </span>
                {isOnline ? (
                  <span className="flex items-center">
                    online <GoDotFill className="text-green-600" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    offline <GoDotFill className="text-red-600" />
                  </span>
                )}
              </div>
            </div>
            <div className={`flex items-center`}>
              {isOnline && (
                <IoVideocam
                  onClick={handleVideoCall}
                  className="text-3xl text-white font-bold"
                />
              )}
              <CiMenuKebab className="text-2xl text-white font-bold ml-6" />
            </div>
          </div>
          <Messages />
          <MessageInput />
        </div>
      ) 
        // <div className="h-[96vh] bg-gray-700 flex flex-col justify-center items-center">
        //   <div className="h-[90vh] flex justify-center items-center">
        //     <h1>Calling...</h1>
        //   </div>
        //   <div className="h-[10vh] flex justify-center items-center">
        //     <button onClick={closeVideoCall} className="bg-red-600 rounded px-6 py-2"><ImPhoneHangUp className="text-white" /></button>
        //   </div>
        // </div>
      }
    </div>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser?.userName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
