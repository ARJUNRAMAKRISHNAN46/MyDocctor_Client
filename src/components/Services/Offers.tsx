function Offers() {
  return (
    <div className="my-24">
      <div
        className=" object-contain px-10 h-96"
        style={{
          backgroundImage: `url("../../../src/assets/banners/doctors-bg2.jpg")`,
        }}
      >
        <div className="flex">
          <div className="w-[50%] mt-20">
            <h1 className="text-center mb-4 font-bold text-[30px] text-blue-950">WE ARE PLEASED TO OFFER YOU THE BEST</h1>
            <div className="flex justify-center mt-2 mb-4">
              <div className="boder-2 h-1 w-20 bg-gray-300"></div>
              <div className="boder-2 h-1 w-20 bg-blue-800"></div>
              <div className="boder-2 h-1 w-20 bg-gray-300"></div>
            </div>
            <p className="text-center text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, sed.
            </p>
            <div className="flex justify-center mt-8">
              <button className="bg-blue-700 text-sm text-white px-6 py-2 rounded-full hover:bg-blue-500">
                GET STARTED
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Offers;
