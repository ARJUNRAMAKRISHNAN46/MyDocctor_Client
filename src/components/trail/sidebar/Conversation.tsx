const Conversation = () => {
  return (
    <div className="flex justify-between p-2 bg-gray-800 text-white border-y border-gray-700">
      <div className="flex">
        <div className="rounded-full w-14 h-14">
          <img className="w-14 rounded-full h-14" src="../../../src/assets/demoimage.jpg" alt="" />
        </div>
        <div className="flex items-center ml-4">
          <h1>User1</h1>
        </div>
      </div>
      <div className="flex items-end">
        <h1 className="text-sm">12:34</h1>
      </div>
    </div>
  );
};

export default Conversation;
