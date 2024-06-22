import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ChatData } from "../../../types/ChatTypes";
import { useConversation } from "../../../zustand/useConversation";

interface MessageProps {
  message: ChatData;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const userData = useSelector((state: RootState) => state.authData.user);
  const { selectedConversation } = useConversation();
  const showThisMessage = (
    message.senderId === selectedConversation?._id ||  message.senderId ===userData._id &&
    message.recieverId === userData._id ||   message.recieverId===selectedConversation?._id 
  );
  console.log(showThisMessage,"==>")
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
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 h-10 rounded-full">
          <img
            className="rounded-full w-10 h-10"
            src={profilePhoto || "../../../../src/assets/demoimage.jpg"}
            alt="profile"
          />
        </div>
      </div>
      <div className={`chat-bubble  text-white pb-2`}>{message?.message}</div>
      <div className="chat-footer opacity-50 text-sm flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
