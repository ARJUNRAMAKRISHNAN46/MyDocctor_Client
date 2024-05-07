
function PageNotFound() {
  return (
    // <div className="flex justify-center items-center bg-red-100 h-[100vh]">
    //   <div className="text-center border-2 border-yellow-500 p-6 md:px-12">
    //     <h1 className="text-red-700 font-bold text-[40px] md:text-[60px]">404</h1>
    //     <h1 className="text-red-700 font-bold md:text-[20px]">Page Not Found</h1>
    //   </div>
    // </div>
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <h1 className="text-[40px] text-gray-800 font-semibold">Loading...</h1>
      <div
        className={`animate-spin rounded-full h-[60px] w-[60px] border-t-4 border-gray-800`}
      ></div>
    </div>
  )
}

export default PageNotFound
