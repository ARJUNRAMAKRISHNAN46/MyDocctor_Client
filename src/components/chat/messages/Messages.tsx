import { useEffect, useRef, useCallback, useState } from "react";
import Message from "./Message";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useConversation } from "../../../zustand/useConversation";
import { getChats, deleteMessage } from "../../../redux/actions/ChatActions";
import { useSocketContext } from "../../../contexts/SocketContext";
import { ChatData } from "../../../types/ChatTypes";

function Messages() {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const [ss, setss] = useState<boolean>(true);
  const {
    selectedConversation,
    setMessages,
    messages = [],
    setReplyToMessage,
  } = useConversation() as any;
  const { socket } = useSocketContext();

  const fetchChats = useCallback(() => {
    if (userData?._id && selectedConversation?._id) {
      dispatch(
        getChats({
          userId: userData._id,
          doctorId: selectedConversation._id,
        })
      ).then((res) => {
        if (res.payload?.data?.messages?.length === 0) {
          setMessages([]);
        } else {
          setMessages(res.payload?.data?.messages);
        }
      });
    }
  }, [userData?._id, selectedConversation?._id, dispatch, setMessages]);

  socket.on("refresh", () => {
    setss(!ss);
  });

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    const handleNewMessage = (newMessage: ChatData) => {
      setMessages([...messages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages, ss]);

  const handleDelete = useCallback(
    (messageId: string) => {
      dispatch(deleteMessage(messageId));

      setMessages((prevMessages: ChatData[]) =>
        prevMessages.filter((message: ChatData) => message._id !== messageId)
      );
      console.log("message deleted");
    },
    [dispatch, setMessages]
  );

  const handleReply = (message: ChatData) => {
    setReplyToMessage(message);
  };

  return (
    <div className="px-4 flex-1 overflow-auto">
      {Array.isArray(messages) &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message?._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message
              message={message}
              handleDelete={handleDelete}
              handleReply={handleReply}
            />
          </div>
        ))}
    </div>
  );
}

export default Messages;
