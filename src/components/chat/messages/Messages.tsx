import { useEffect, useRef } from "react";
import Message from "./Message";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useConversation } from "../../../zustand/useConversation";
import { getChats } from "../../../redux/actions/ChatActions";
import { useSocketContext } from "../../../contexts/SocketContext";
import notificationSound from "../../../assets/sounds/notification.mp3";

function Messages() {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const { selectedConversation, setMessages, messages } = useConversation();
  const { socket } = useSocketContext();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
    dispatch(
      getChats({
        userId: userData?._id as string,
        doctorId: selectedConversation?._id as string,
      })
    ).then((res) => {
      if (res.payload?.data?.messages?.length === 0) {
        setMessages([]);
      } else {
        setMessages(res.payload?.data?.messages);
      }
    });
  }, [lastMessageRef]);

  useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
      console.log("🚀 ~ handleNewMessage ~ newMessage:", newMessage)
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);
  }, [socket, setMessages, messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages?.length > 0 &&
        messages?.map((message, index) => (
          <div
            key={message?._id}
            ref={index === messages?.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}
    </div>
  );
}

export default Messages;
