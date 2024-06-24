import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ChatData } from "../../../types/ChatTypes";
import { useConversation } from "../../../zustand/useConversation";
import { FaReply, FaTrash } from "react-icons/fa6";

interface MessageProps {
  message: ChatData;
  handleDelete: (messageId: string) => void;
}

const Message: React.FC<MessageProps> = ({ message, handleDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const userData = useSelector((state: RootState) => state.authData.user);
  const { selectedConversation } = useConversation();
  const showThisMessage =
    message?.senderId === selectedConversation?._id ||
    (message?.senderId === userData?._id &&
      message?.recieverId === userData?._id) ||
    message?.recieverId === selectedConversation?._id;
  if (!showThisMessage) {
    return null;
  }
  const fromMe = message?.senderId === userData?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePhoto = fromMe
    ? userData?.profilePhoto
    : selectedConversation?.profilePhoto;

  const createdAtDate = new Date(message?.createdAt);
  let hours = createdAtDate.getHours();
  const minutes = createdAtDate.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return (
    <div
      className={`chat ${chatClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="chat-image avatar">
        <div className="w-10 h-10 rounded-full">
          <img
            className="rounded-full w-10 h-10"
            src={profilePhoto || "../../../../src/assets/demoimage.jpg"}
            alt="profile"
          />
        </div>
      </div>
      {message?.type === "image" && (
        <div>
          <img
            className="w-48 h-48 object-contain"
            src={message?.message}
            alt={message?.message}
          />
        </div>
      )}
      {message?.type === "audio" && <div>{/* Handle audio message */}</div>}
      {message?.type === "text" && (
        <div className={`chat-bubble text-white pb-2`}>{message?.message}</div>
      )}
      <div className="chat-footer opacity-50 text-sm flex gap-1 items-center">
        {formattedTime}
        {isHovered && (
          <>
            <button>
              <FaReply className="text-gray-500 hover:text-gray-200 ml-2" />
            </button>
            <button onClick={() => handleDelete(message._id)}>
              <FaTrash className="text-gray-500 hover:text-gray-200 ml-2" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
