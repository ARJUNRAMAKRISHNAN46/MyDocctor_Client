import { useEffect, useRef } from "react";
import Message from "./Message";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useConversation } from "../../../zustand/useConversation";
import { getChats, deleteMessage } from "../../../redux/actions/ChatActions";
import { useSocketContext } from "../../../contexts/SocketContext";
// import notificationSound from "../../../assets/sounds/notification.mp3";

function Messages() {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const { selectedConversation, setMessages, messages = [] } = useConversation(); // Ensure messages is an array
  const { socket } = useSocketContext();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
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
  }, [lastMessageRef, selectedConversation, setMessages, messages, dispatch, userData?._id]);

  useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
      newMessage.shouldShake = true;
      // const sound = new Audio(notificationSound);
      // sound.play();
      setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages]);

  const handleDelete = (messageId: string) => {
    dispatch(deleteMessage(messageId)).then((res) => {
      console.log("🚀 ~ dispatch ~ res:", res);
    });

    setMessages((prevMessages: any) =>
      prevMessages.filter((message: any) => message._id !== messageId)
    );
    console.log("message deleted");
  };

  return (
    <div className="px-4 flex-1 overflow-auto">
      {Array.isArray(messages) && messages.length > 0 && 
        messages.map((message, index) => (
          <div
            key={message?._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} handleDelete={handleDelete} />
          </div>
        ))
      }
    </div>
  );
}

export default Messages;
