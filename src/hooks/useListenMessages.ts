import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3";
import { useConversation } from "../zustand/useConversation";
import { useSocketContext } from "../contexts/SocketContext";

interface Message {
  _id: string;
  text: string;
  shouldShake?: boolean;
}

interface Socket {
  on: (event: string, callback: (data: Message) => void) => void;
  off: (event: string) => void;
}

const useListenMessages = () => {
  
  const { socket } = useSocketContext() as { socket: Socket };
  const { messages, setMessages } = useConversation() as {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
  };
  
  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
