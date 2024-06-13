
import { useSocketContext } from "../../../contexts/SocketContext";
import Conversation from "./Conversation";
interface ConversationsProps {
  user: string;
}

const Conversations: React.FC<ConversationsProps> = ({ user }) => {
  console.log("🚀 ~ user:", user)
  const { onlineUsers } = useSocketContext();
  console.log("🚀 ~ onlineUsers:", onlineUsers)

  return (
    <div className="py-2 flex flex-col overflow-auto h-[96vh] border-r border-gray-600">
      {onlineUsers?.map((conversation, idx) => (
        <Conversation
          key={conversation?._id}
          conversation={conversation}
          lastIdx={idx === onlineUsers.length - 1}
        />
      ))}
      {/* {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null} */}
    </div>
  );
}

export default Conversations;
