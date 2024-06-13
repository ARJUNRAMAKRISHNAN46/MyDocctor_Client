import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import axios from "axios";

function MessageInput() {
  const [message, setMessage] = useState<string>("");
  const userData = useSelector((state: RootState) => state.userData.user);
  console.log("🚀 ~ MessageInput ~ userData:", userData);

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
      recieverId: "664605618a6679a8b418ac0e",
      message: message,
    };

    await axios
      .post(`http://localhost:8080/chat/api/send-message/${userData?._id}`,{
        messageData
      })
      .then((res) => {
        console.log("🚀 ~ awaitaxios.post ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ awaitaxios.post ~ err:", err);
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
