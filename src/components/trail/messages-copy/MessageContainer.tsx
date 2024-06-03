import { CiMenuKebab } from "react-icons/ci";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <div className="flex flex-col justify-between h-[668px]">
      <div className="flex justify-between py-3 px-6 bg-gray-700 text-white">
        <div className="flex items-center">
          <img
            className="w-14 h-14 rounded-full"
            src="../../../src/assets/demoimage.jpg"
            alt=""
          />
          <h1 className="ml-4">User1</h1>
        </div>
        <div className="flex justify-center items-center">
          <CiMenuKebab className="text-xl" />
        </div>
      </div>
      <div>
        {/* dfjodisf */}
      </div>
      <MessageInput/>
    </div>
  );
};

export default MessageContainer;
