function Loading() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <h1 className="text-[40px] text-gray-800 font-semibold">Loading...</h1>
      <div
        className={`animate-spin rounded-full h-[60px] w-[60px] border-t-4 border-gray-800`}
      ></div>
    </div>
  );
}

export default Loading;
