function MeetOurSpecialist() {
  return (
    <div>
      <div className="flex justify-center p-8">
        <div className="w-[40%] px-24 mt-20">
          <h1 className="text-[40px] text-blue-950 text-center font-bold">
            MEET OUR SPECIALISTS
          </h1>
          <div className="flex justify-center mt-2 mb-2">
            <div className="boder-2 h-1 w-14 bg-gray-300"></div>
            <div className="boder-2 h-1 w-14 bg-blue-800"></div>
            <div className="boder-2 h-1 w-14 bg-gray-300"></div>
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
            src="../../../src/assets/consultations/doc1.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default MeetOurSpecialist;
