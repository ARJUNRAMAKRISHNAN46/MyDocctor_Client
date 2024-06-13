import { useEffect, useRef, useState } from "react";
// import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import axios from "axios";

function Messages() {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    fetchMessage();
  }, [lastMessageRef]);

  const fetchMessage = async () => {
    await axios
      .get(
        "http://localhost:8080/chat/api/get-chatBy-id/6645feab8a6679a8b418abff"
      )
      .then((res) => {
        setMessages(res.data);
        console.log("🚀 ~ response ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ response ~ err:", err);
      });
  };

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message?._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}
      {/* {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start a conversation</p>
      )} */}
    </div>
  );
}

export default Messages;
