
import Conversation from "./Conversation";
import useGetConversations from "../../../hooks/useGetConversations";
// import { getRandomEmoji } from "../../../utils/emoji";
interface ConversationsProps {
  user: string;
}

const Conversations: React.FC<ConversationsProps> = ({ user }) => {
  const { loading, conversations } = useGetConversations(user);
  console.log("🚀 ~ Conversations ~ conversations:", conversations)

  return (
    <div className="py-2 flex flex-col overflow-auto h-[96vh] border-r border-gray-600">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation?._id}
          conversation={conversation}
          // emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}

export default Conversations;
