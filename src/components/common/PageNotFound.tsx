
function PageNotFound() {
  return (
    <div className="flex justify-center items-center bg-red-100 h-[100vh]">
      <div className="text-center border-2 border-yellow-500 p-6 md:px-12">
        <h1 className="text-red-700 font-bold text-[40px] md:text-[60px]">404</h1>
        <h1 className="text-red-700 font-bold md:text-[20px]">Page Not Found</h1>
      </div>
    </div>
  )
}

export default PageNotFound
