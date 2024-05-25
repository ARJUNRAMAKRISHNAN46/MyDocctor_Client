function Achievements() {
  return (
    <div>
      <div
        className="h-72 "
        style={{
          backgroundImage: `url("../../../src/assets/banners/banner.jpg")`,
        }}
      >
        <div className="w-full h-full bg-blue-950 opacity-80 flex items-center justify-center">
          <div>
            <h1 className="text-center font-bold text-[40px] text-white">
              ABOUT US
            </h1>
            <div className="flex justify-center mt-2 mb-2">
              <div className="boder-2 h-1 w-20 bg-gray-300"></div>
              <div className="boder-2 h-1 w-20 bg-blue-800"></div>
              <div className="boder-2 h-1 w-20 bg-gray-300"></div>
            </div>
            <p className="text-sm text-white font-thin">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-8">
        <div className="w-[40%] px-24 mt-20">
          <h1 className="text-[40px] text-blue-950 text-center font-bold">
            OUR DOCTORS
          </h1>
          <h1 className="text-[40px] text-blue-950 text-center font-bold">
            ACHEIVEMENT
          </h1>
          <div className="flex justify-center mt-2 mb-2">
            <div className="boder-2 h-1 w-20 bg-gray-300"></div>
            <div className="boder-2 h-1 w-20 bg-blue-800"></div>
            <div className="boder-2 h-1 w-20 bg-gray-300"></div>
          </div>
          <p className="text-center text-sm font-thin mt-4">
            Lorem ipsum dolor sit amet.
          </p>
          <p className="text-center text-sm text-gray-700 mt-8">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt,
            quod laborum alias. Vitae dolorum, officia sit! Saepe ullam facere
            at, consequatur incidunt, quae esse, quis ut reprehenderit
            dignissimos, libero delectus.
          </p>
        </div>
        <div className="w-[60%] p-8">
          <img
            className="w-[90%] h-[90%]"
            src="../../../src/assets/consultations/doctor 5.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Achievements;