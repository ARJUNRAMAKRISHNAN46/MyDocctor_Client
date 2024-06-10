import React, { useState } from "react";
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

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation() as any;

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation?._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data: { error?: string; message?: Message } = await res.json();
      console.log("🚀 ~ sendMessage ~ data:", data);
      console.log("🚀 ~ sendMessage ~ data:", data.message);

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.message) {
        setMessages([...messages, data]);
      }
        console.log("🚀 ~ sendMessage ~ messages:", messages)
      
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
