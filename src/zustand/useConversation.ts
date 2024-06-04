import { create } from "zustand";
import { UserData } from "../types/userData";

interface Message {
  _id: string;
  text: string;
  // Add other fields as necessary
}

interface Conversation {
  _id: string;
  // Add other fields as necessary
}

interface ConversationState {
  selectedConversation: UserData | null;
  setSelectedConversation: (selectedConversation: UserData | null) => void;
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
