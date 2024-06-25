// import { create } from "zustand";
// import { ConversationProps } from "../components/chat/sidebar/Conversation";
// import { ChatData } from "../types/ChatTypes";

// interface ConversationState {
//   selectedConversation: ConversationProps | null;
//   setSelectedConversation: (selectedConversation: ConversationProps | null) => void;
//   messages: ChatData[];
//   setMessages: (messages: ChatData[]) => void;
// }

// export const useConversation = create<ConversationState>((set) => ({
//   selectedConversation: null,
//   setSelectedConversation: (selectedConversation) =>
//     set({ selectedConversation }),
//   messages: [],
//   setMessages: (messages) => set({ messages }),
// }));


import { create } from "zustand";
import { ConversationProps } from "../components/chat/sidebar/Conversation";
import { ChatData } from "../types/ChatTypes";

interface ConversationState {
  selectedConversation: ConversationProps | null;
  setSelectedConversation: (selectedConversation: ConversationProps | null) => void;
  messages: ChatData[];
  setMessages: (messages: ChatData[]) => void;
  replyToMessage: ChatData | null;
  setReplyToMessage: (message: ChatData | null) => void;
}

export const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  replyToMessage: null,
  setReplyToMessage: (message) => set({ replyToMessage: message }),
}));
