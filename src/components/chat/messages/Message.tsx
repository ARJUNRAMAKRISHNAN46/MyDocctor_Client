import { useAuthContext } from "../../../contexts/AuthContext";
import { useConversation } from "../../../zustand/useConversation";

interface MessageProps {
  message: {
    senderId: string;
    message: string;
    shouldShake?: boolean;
  };
}

function Message({ message }: MessageProps) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePhoto = fromMe
    ? authUser?.profilePhoto
    : selectedConversation?.profilePhoto;
  const bubbleColor = fromMe ? "bg-blue-500" : "bg-gray-700";
  const shakeClass = message?.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePhoto} alt="" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-sm flex gap-1 items-center">
        12:50
      </div>
    </div>
  );
}

export default Message;
