import MessageContainer from "../chat/messages/MessageContainer";
import Conversations from "../chat/sidebar/Conversations";

function UserChats() {
  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[96vh] flex">
        <div className="w-[35%] h-[96vh]">
          <Conversations  user={"user"} />
        </div>
        <div className="w-[65%] h-[96vh]">
          <MessageContainer />
        </div>
      </div>
    </div>
  );
}

export default UserChats;
