import { UserData } from "./userData";

export interface ChatInitial {
  loading: boolean;
  err: boolean | string;
  users?: UserData[] | null;
  selectedUser: UserData | null;
  chatId?: string;
  onlineUsers?: { socketId: string; id: string }[];
}

export interface ChatData {
  createdAt: string;
  message: string;
  type: string;
  recieverId: string;
  senderId: string;
  updatedAt: string;
  replyTo?: string;
  _id: string;
}

export interface MessageData {
  createdAt: string;
  messages: [];
  participants: [];
  updatedAt: string;
}
