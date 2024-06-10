import { createSlice } from "@reduxjs/toolkit";
import { ErrorPayload } from "vite/types/hmrPayload.js";
import toast from "react-hot-toast";
import { ChatInitial } from "../../types/ChatTypes";

const initialState: ChatInitial = {
  loading: false,
  err: false,
  users: null,
  selectedUser: null,
  chatId: "",
  onlineUsers: [],
};

const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setLastMessage: (state, { payload }) => {
      if (state.users) {
        state.users = state.users.map((user) =>
          user._id === payload.recieverId
            ? { ...user, lastMessage: payload.message }
            : user
        );
      }
    },

    setMessageCount: (state, { payload }) => {
      if (state.users) {
        state.users = state.users.map((user) =>
          user._id === payload ? { ...user, messageCount: 0 } : user
        );
      }
    },

    updateunreadMessageCountAndLastMessage: (state, { payload }) => {
        if (state.users) {
            state.users = state.users.map((user) => {
              if (user._id == payload.userId) {
                let messageCount;
                if (user && user.messageCount?.toString()) {
                  messageCount = user?.messageCount + 1;
                } else {
                  messageCount = 0;
                }
                return {
                  ...user,
                  lastMessage: payload.message,
                  messageCount: Number(messageCount),
                };
              } else {
                return user;
              }
            });
          }
    },

    selecteOneUserforChat: (state, { payload }) => {
        state.selectedUser = state[payload.role as "users"]?.find(
          (user) => user._id === payload.userId
        );
      },

      setOnlineUsers: (state, { payload }) => {
        const userExist = state?.onlineUsers?.some(
          (user) => user.id === payload.id
        );
        if (!userExist) {
          state.onlineUsers?.push(payload);
        }
      },

      removeOnlineUser: (state, { payload }) => {
        state.onlineUsers = state.onlineUsers?.filter(
          (user) => payload.id !== user.id
        );
      },
    },
  },
);

export const { setLastMessage, setMessageCount } = chatReducer.actions;

export default chatReducer.reducer;
