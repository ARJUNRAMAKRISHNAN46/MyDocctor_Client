import { useAuthContext } from "../../../contexts/AuthContext";


interface MessageProps {
  message: {
    senderId: string;
    message: string;
    shouldShake?: boolean;
  };
}

function Message({ message }: MessageProps) {
  const { authUser } = useAuthContext();
  console.log("🚀 ~ Message ~ authUser:", authUser)
  const fromMe = message.senderId === authUser?._id;
  console.log("🚀 ~ Message ~ fromMe:", fromMe)
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  // const profilePhoto = fromMe
  //   ? authUser?.profilePhoto
  //   : selectedConversation?.profilePhoto;
  const bubbleColor = fromMe ? "bg-blue-500" : "bg-gray-700";
  const shakeClass = message?.shouldShake ? "shake" : "";
  console.log(message,"message coming here")
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        {/* <div className="w-10 h-10 rounded-full"> */}
          {/* <img className="rounded-full w-10 h-10" src={profilePhoto || "../../../../src/assets/demoimage.jpg"} alt="profile" /> */}
        {/* </div> */}
      </div>
      <div
        className={`chat-bubble text-white ${bubbleColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      {/* <div className="chat-footer opacity-50 text-sm flex gap-1 items-center">
        12:50
      </div> */}
    </div>
  );
}

export default Message;
