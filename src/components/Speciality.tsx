function Speciality() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="font-bold text-[10px] md:text-[24px] md:mb-2 ml-1 md:ml-6">
          Specialities
        </h1>
        <div className="md:flex grid grid-cols-2">
          <div className="ml-[1.5%] border rounded-sm md:rounded-md md:h-[380px] bg-white md:w-[23%] shadow-2xl pb-1">
            <div className="bg-green-500 h-[120px] border rounded-t-sm md:rounded-t-md md:h-64 transition-all duration-300 transform hover:scale-105">
              <img src="../../src/assets/images/ortho.png" alt="" />
            </div>
            <h1 className="leading-none ml-1 text-[10px] mt-0.5 md:ml-8 md:mt-3 font-bold md:text-xl">
              Orthopaedic
            </h1>
            <h1 className="leading-none ml-1 text-[5px] mt-0.5 text-gray-700 md:ml-8 md:mt-1 md:text-[16px]">
              speciality that focuses on injuries and diseases of your body's
              musculoskeletal system
            </h1>
          </div>

          <div className="ml-[1.5%] border rounded-sm md:rounded-md md:h-[380px] bg-white md:w-[23%] shadow-2xl">
            <div className="bg-red-500 h-[120px] border rounded-t-sm md:rounded-t-md md:h-64 transition-all duration-300 transform hover:scale-105">
              <img src="../../src/assets/images/cardio.png" alt="" />
            </div>
            <h1 className="leading-none ml-1 text-[10px] mt-0.5 md:ml-8 md:mt-3 font-bold md:text-xl">
              Cardiologist
            </h1>
            <h1 className="leading-none ml-1 text-[6px] mt-0.5 text-gray-700 md:ml-8 md:mt-1 md:text-[16px]">
              {" "}
              a physician who's an expert in the care of your heart and blood
              vessels
            </h1>
          </div>

          <div className="ml-[1.5%] border rounded-sm md:rounded-md md:h-[380px] bg-white md:w-[23%] shadow-2xl">
            <div className="bg-blue-500 h-[120px] border rounded-t-sm md:rounded-t-md md:h-64 transition-all duration-300 transform hover:scale-105">
              <img src="../../src/assets/images/nuorology.png" alt="" />
            </div>
            <h1 className="leading-none ml-1 text-[10px] mt-0.5 md:ml-8 md:mt-3 font-bold md:text-xl">
              Neurologist
            </h1>
            <h1 className="leading-none ml-1 text-[6px] mt-0.5 text-gray-700 md:ml-8 md:mt-1 md:text-[16px]">
              diagnoses, treats and manages disorders of the brain and nervous
              system
            </h1>
          </div>

          <div className="ml-[1.5%] border rounded-sm md:rounded-md md:h-[380px] bg-white md:w-[23%] shadow-2xl">
            <div className="bg-orange-500 h-[120px] border rounded-t-sm md:rounded-t-md md:h-64 transition-all duration-300 transform hover:scale-105">
              <img src="../../src/assets/images/urologist.png" alt="" />
            </div>
            <h1 className="leading-none ml-1 text-[10px] mt-0.5 md:ml-8 md:mt-3 font-bold md:text-xl">
              Urologist
            </h1>
            <h1 className="leading-none ml-1 text-[6px] mt-0.5 text-gray-700 md:ml-8 md:mt-1 md:text-[16px]">
              specializing in conditions that affect the urinary tract in men,
              women and children, and diseases that affect the reproductive
              system{" "}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-gray-700 text-white md:text-xl font-semibold md:px-6 md:py-2 md:rounded-lg text-[6px] px-1 py-0.5 mb-1 border rounded-sm">
          Find More
        </button>
      </div>
    </div>
  );
}

export default Speciality;
