import { create } from "zustand";
import { ConversationProps } from "../components/chat/sidebar/Conversation";

interface Message {
  _id: string;
  text: string;
}

interface ConversationState {
  selectedConversation: ConversationProps | null;
  setSelectedConversation: (selectedConversation: ConversationProps | null) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

export const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));