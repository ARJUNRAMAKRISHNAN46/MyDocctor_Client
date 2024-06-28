import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useConversation } from "../../../zustand/useConversation";
import { sendMessage } from "../../../redux/actions/ChatActions";
import { useSocketContext } from "../../../contexts/SocketContext";
import { GrAttachment } from "react-icons/gr";
import { FiMic } from "react-icons/fi";
import { imageUpload } from "../../../utils/UploadImage";
import { VideoUpload } from "../../../utils/UploadVideo";

function MessageInput() {
  const [message, setMessage] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const { setMessages, messages, replyToMessage, setReplyToMessage } =
    useConversation();
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
          setMessages([...(messages || []), res.payload?.data]);
        });

        setReplyToMessage(null);
      } catch (error) {
        toast.error("Failed to upload image");
      }
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleStartRecording = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Audio recording is not supported in this browser");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setAudioChunks((prev) => [...prev, event.data]);
          }
        };
        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          try {
            const audioUrl = await VideoUpload(audioBlob);
            if (!audioUrl) {
              toast.error("Failed to upload audio");
              return;
            }

            const messageData = {
              senderId: userData?._id,
              recieverId: selectedConversation?._id,
              message: audioUrl,
              type: "audio",
              replyTo: replyToMessage?.message,
            };

            socket.emit("new message", {
              obj: { ...messageData, createdAt: new Date() },
            });

            dispatch(sendMessage(messageData)).then((res) => {
              setMessages([...(messages || []), res.payload?.data]);
            });

            setReplyToMessage(null);
          } catch (error) {
            toast.error("Failed to upload audio");
          }
        };
        recorder.start();
        setMediaRecorder(recorder);
        setAudioChunks([]);
        setIsRecording(true);
      })
      .catch((error) => {
        toast.error("Failed to start recording");
        console.error("Error accessing audio stream:", error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      {replyToMessage && (
        <div className="p-2 bg-gray-600 text-white rounded mb-2">
          Replying to:
          {/* {replyToMessage.message} */}
          {replyToMessage.message &&
            !replyToMessage.message.includes(".webm") &&
            !replyToMessage.message.includes(".jpg") &&
            !replyToMessage.message.includes(".png") && (
              <div>{replyToMessage.message}</div>
            )}
          {replyToMessage.message &&
            replyToMessage.message.endsWith(".webm") && (
              <div>
                <video
                  className="h-14 w-32"
                  src={replyToMessage.message}
                  controls
                />
              </div>
            )}
          {replyToMessage.message &&
            (replyToMessage.message.includes(".jpg") ||
              replyToMessage.message.includes(".png")) && (
              <div className="w-14">
                <img src={replyToMessage.message} />
              </div>
            )}
          <button
            className="ml-4 text-red-600"
            onClick={() => setReplyToMessage(null)}
          >
            Cancel
          </button>
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
        <button
          type="button"
          className="absolute inset-y-0 end-10 flex items-center pe-3"
          onClick={isRecording ? handleStopRecording : handleStartRecording}
        >
          <FiMic className={isRecording ? "text-red-600" : ""} />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
