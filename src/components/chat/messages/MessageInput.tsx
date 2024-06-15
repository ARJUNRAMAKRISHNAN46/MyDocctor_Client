import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useConversation } from "../../../zustand/useConversation";
import { sendMessage } from "../../../redux/actions/ChatActions";
import { ChatData } from "../../../types/ChatTypes";
import { useSocketContext } from "../../../contexts/SocketContext";

function MessageInput() {
  const [message, setMessage] = useState<string>("");
  const { setMessages, messages } = useConversation();
  const [lastMessage, setLastMessage] = useState<ChatData>();
  const userData = useSelector((state: RootState) => state.authData.user);
  const dispatch: AppDispatch = useDispatch();
  const { selectedConversation } = useConversation();
  const { socket } = useSocketContext();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!message) {
      return;
    }

    if (message.trim() === "") {
      toast.error("Message is empty");
      return;
    }

    const messageData = {
      senderId: userData?._id,
      recieverId: selectedConversation?._id,
      message: message,
    };
    socket.emit("new message",{ obj: { ...messageData, createdAt: new Date()}});

    dispatch(sendMessage(messageData)).then((res) => {

      setLastMessage(res.payload?.data);
      setMessages([...messages, res.payload?.data]);
    });

    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
