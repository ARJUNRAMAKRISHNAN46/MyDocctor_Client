import { UserData } from "./userData";

export interface ChatInitial {
  loading: boolean;
  err: boolean | string;
  users?: UserData[] | null;
  selectedUser: UserData | null;
  chatId?: string;
  onlineUsers?: { socketId: string; id: string }[];
}
