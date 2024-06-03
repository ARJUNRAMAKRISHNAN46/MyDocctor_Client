import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  const loading = false;
  return (
    <div>
      <div className="w-full relative p-2">
        <input
          type="text"
          className="border text-sm rounded-[5px] block w-full p-2.5 bg-gray-600 text-white"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend className="text-white mx-2 text-xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
