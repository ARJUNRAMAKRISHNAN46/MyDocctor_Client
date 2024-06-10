import { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useConversation } from "../../../zustand/useConversation";
import { useAuthContext } from "../../../contexts/AuthContext";

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="flex-col flex justify-between h-[96vh]">
          <div className="bg-gray-700 px-4 py-2 mb-2 flex items-center">
            <img
              className="w-12 h-12 rounded-full object-contain"
              src={selectedConversation?.profilePhoto || "../../../../src/assets/demoimage.jpg"}
              alt="profileImage"
            />
            <div className="ml-4">
              <span className="text-white font-bold">
                {selectedConversation?.name}
              </span>
              {/* <h1 className="text-sm font-thin">last seen 09:12 AM</h1> */}
            </div>
          </div>
          <Messages />
          <MessageInput />
        </div>
      )}
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
