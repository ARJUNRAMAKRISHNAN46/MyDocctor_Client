// import React, { useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { BsSend } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../redux/store";
// import { useConversation } from "../../../zustand/useConversation";
// import { sendMessage } from "../../../redux/actions/ChatActions";
// import { ChatData } from "../../../types/ChatTypes";
// import { useSocketContext } from "../../../contexts/SocketContext";
// import { GrAttachment } from "react-icons/gr";
// import { imageUpload } from "../../../utils/UploadImage";

// function MessageInput() {
//   const [message, setMessage] = useState<string>("");
//   const { setMessages, messages } = useConversation();
//   const [lastMessage, setLastMessage] = useState<ChatData>();
//   const userData = useSelector((state: RootState) => state.authData.user);
//   const dispatch: AppDispatch = useDispatch();
//   const { selectedConversation } = useConversation() as any;
//   const { socket } = useSocketContext();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!message.trim()) {
//       toast.error("Message is empty");
//       return;
//     }

//     const messageData = {
//       senderId: userData?._id,
//       recieverId: selectedConversation?._id,
//       message: message,
//       type: "text",
//     };
//     socket.emit("new message", {
//       obj: { ...messageData, createdAt: new Date() },
//     });

//     dispatch(sendMessage(messageData)).then((res) => {
//       setLastMessage(res.payload?.data);
//       setMessages([...(messages || []), res.payload?.data]);
//     });

//     setMessage("");
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       try {
//         const fileUrl = await imageUpload(files[0]);
//         if (!fileUrl) {
//           toast.error("Failed to upload image");
//           return;
//         }

//         const messageData = {
//           senderId: userData?._id,
//           recieverId: selectedConversation?._id,
//           message: fileUrl,
//           type: "image",
//         };

//         socket.emit("new message", {
//           obj: { ...messageData, createdAt: new Date() },
//         });

//         dispatch(sendMessage(messageData)).then((res) => {
//           setLastMessage(res.payload?.data);
//           setMessages([...(messages || []), res.payload?.data]);
//         });
//       } catch (error) {
//         toast.error("Failed to upload image");
//       }
//     }
//   };

//   const handleAttachClick = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <form className="px-4 my-3" onSubmit={handleSubmit}>
//       <div className="w-full relative">
//         <button
//           type="button"
//           className="absolute inset-y-0 start-0 ml-3 flex items-center pe-3"
//           onClick={handleAttachClick}
//         >
//           <GrAttachment />
//         </button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: "none" }}
//           onChange={handleFileChange}
//         />
//         <input
//           type="text"
//           className="border text-sm rounded-lg block w-full p-2.5 pl-10 bg-gray-600 text-white"
//           placeholder="Send a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="absolute inset-y-0 end-0 flex items-center pe-3"
//         >
//           <BsSend />
//         </button>
//       </div>
//     </form>
//   );
// }

// export default MessageInput;



import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useConversation } from "../../../zustand/useConversation";
import { sendMessage } from "../../../redux/actions/ChatActions";
// import { ChatData } from "../../../types/ChatTypes";
import { useSocketContext } from "../../../contexts/SocketContext";
import { GrAttachment } from "react-icons/gr";
import { imageUpload } from "../../../utils/UploadImage";

function MessageInput() {
  const [message, setMessage] = useState<string>("");
  const { setMessages, messages, replyToMessage, setReplyToMessage } = useConversation();
  // const [ setLastMessage] = useState<ChatData>();
  const userData = useSelector((state: RootState) => state.authData.user);
  const dispatch: AppDispatch = useDispatch();
  const { selectedConversation } = useConversation() as any;
  const { socket } = useSocketContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Message is empty");
      return;
    }

    const messageData = {
      senderId: userData?._id,
      recieverId: selectedConversation?._id,
      message: message,
      type: "text",
      replyTo: replyToMessage?.message,
    };
    socket.emit("new message", {
      obj: { ...messageData, createdAt: new Date() },
    });

    dispatch(sendMessage(messageData)).then((res) => {
      // setLastMessage(res.payload?.data);
      setMessages([...(messages || []), res.payload?.data]);
    });

    setMessage("");
    setReplyToMessage(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        const fileUrl = await imageUpload(files[0]);
        if (!fileUrl) {
          toast.error("Failed to upload image");
          return;
        }

        const messageData = {
          senderId: userData?._id,
          recieverId: selectedConversation?._id,
          message: fileUrl,
          type: "image",
          replyTo: replyToMessage?.message, 
        };
        
        socket.emit("new message", {
          obj: { ...messageData, createdAt: new Date() },
        });

        dispatch(sendMessage(messageData)).then((res) => {
          // setLastMessage(res.payload?.data);
          setMessages([...(messages || []), res.payload?.data]);
        });

        setReplyToMessage(null); 
      } catch (error) {
        toast.error("Failed to upload image");
      }
    }
  };
  
  console.log("🚀 ~ handleFileChange ~ messageData.replyToMessage:", replyToMessage)
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      {replyToMessage && (
        <div className="p-2 bg-gray-300 text-gray-700 rounded mb-2">
          Replying to: {replyToMessage.message}
          <button className="ml-4 text-red-600" onClick={() => setReplyToMessage(null)}>Cancel</button>
        </div>
      )}
      <div className="w-full relative">
        <button
          type="button"
          className="absolute inset-y-0 start-0 ml-3 flex items-center pe-3"
          onClick={handleAttachClick}
        >
          <GrAttachment />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 pl-10 bg-gray-600 text-white"
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
