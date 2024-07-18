import React, { useEffect, useState } from "react";
import { useSocketContext } from "../../../contexts/SocketContext";
import { useConversation } from "../../../zustand/useConversation";
import { UserData } from "../../../types/userData";
import { format, isToday, parseISO } from "date-fns";

export interface ConversationProps {
  conversation: UserData;
  conversatio_id: Promise<any>;
  lastIdx: boolean;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  conversatio_id,
  lastIdx,
}) => {
  const [lastMessage, setLastMessage] = useState(null) as any;
  useEffect(() => {
    conversatio_id.then((res) => {
      console.log("🚀 ~ conversatio_id.then ~ res:", res);
      setLastMessage(res);
    });
  }, [conversatio_id]);
  const { selectedConversation, setSelectedConversation } =
    useConversation() as any;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const isSelected = selectedConversation?._id === conversation._id;

  const formatLastMessageDate = (dateString: any) => {
    const date = parseISO(dateString);
    if (isToday(date)) {
      return format(date, "HH:mm");
    } else {
      return format(date, "yyyy-MM-dd");
    }
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 border-b border-gray-600 rounded p-2 py-2 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              className="w-12 h-12 rounded-full"
              src={
                conversation.profilePhoto ||
                "../../../../src/assets/demoimage.jpg"
              }
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="gap-3 justify-between">
            <div className="flex justify-between">
              <span className="font-bold text-gray-200">
                {conversation?.name}
              </span>
              <span className="text-gray-200 text-[12px]">
                {lastMessage?.createdAt &&
                  formatLastMessageDate(lastMessage.createdAt)}
              </span>
            </div>
            {lastMessage?.type === "text" && (
              <p className="text-[12px] truncate w-28 text-gray-200">
                {lastMessage?.message}
              </p>
            )}
            {lastMessage?.type === "image" && (
              <p className="text-[12px] truncate w-28 text-gray-200">image</p>
            )}
            {lastMessage?.type === "audio" && (
              <p className="text-[12px] truncate w-28 text-gray-200">audio</p>
            )}
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
