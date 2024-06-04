import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useConversation } from "../zustand/useConversation";

interface Message {
  _id: string;
  text: string;
  // Add other fields as necessary
}

interface Conversation {
  _id: string;
  // Add other fields as necessary
}

interface UseConversationReturn {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  selectedConversation: Conversation | null;
}

interface ApiResponse {
  error?: string;
  messages?: Message[];
}

const useGetMessages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } =
    useConversation() as UseConversationReturn;

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation?._id}`);

        console.log("🚀 ~ getMessages ~ res:", res)
        const data: any = await res.json();
        console.log("🚀 ~ getMessages ~ data:", data.data);

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.data) {
          setMessages(data.data);
        }
        else{
          setMessages([])
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
