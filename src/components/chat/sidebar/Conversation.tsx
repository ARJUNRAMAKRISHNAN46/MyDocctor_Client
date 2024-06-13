import React, { useState } from "react";
import { useSocketContext } from "../../../contexts/SocketContext";
import { useConversation } from "../../../zustand/useConversation";

export interface ConversationProps {
  conversation: {
    _id: string;
    profilePhoto: string;
    name: string;
  };
  lastIdx: boolean;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  lastIdx,
}) => {
  const { onlineUsers } = useSocketContext();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isOnline = onlineUsers.includes(conversation._id);
  const isSelected = selectedConversation?._id === conversation._id;
  console.log(conversation, "converstatiotej");

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-2 cursor-pointer ${
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
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation?.name}</p>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
