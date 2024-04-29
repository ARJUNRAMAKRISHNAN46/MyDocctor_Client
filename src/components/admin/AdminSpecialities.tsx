function AdminSpecialities() {
  const handleBtnClick = () => {
    console.log("button clicked");
  };

  const specs = [
    {
      specName: "Orthopedics",
      SpecImage: "../../src/assets/ortho.png",
      SpecDescription:
        "speciality that focuses on injuries and diseases of your body's musculoskeletal system",
    },
    {
      specName: "Cardiology",
      SpecImage: "../../src/assets/cardiology.jpg",
      SpecDescription:
        "a physician who's an expert in the care of your heart and blood vessels",
    },
    {
      specName: "Neurologist",
      SpecImage: "../../src/assets/nuorology.png",
      SpecDescription:
        "diagnoses, treats and manages disorders of the brain and nervous system",
    },
    {
      specName: "Urologist",
      SpecImage: "../../src/assets/urologist.png",
      SpecDescription:
        "specializing in conditions that affect the urinary tract in men, women and children, and diseases that affect the reproductive system",
    },
  ];
  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[96vh] md:p-4">
        <div className="w-full flex justify-end">
          <button
            onClick={handleBtnClick}
            className="bg-blue-600 text-white px-3 py-1 font-semibold rounded-md"
          >
            Add Specialities
          </button>
        </div>
        <div className="m-2">
          <h1 className="font-bold text-[23px] text-white">Specialites</h1>
        </div>
        {/* <div className="border-2 border-gray-500"></div> */}
        {specs.map((data) => (
          <>
          <div className="flex">
          <div className="border-2 border-gray-500 w-[30%] h-[60px] text-gray-200 p-4"><h1>{data.specName}</h1></div>
          <div className="border-2 border-gray-500 w-[10%] h-[60px] text-gray-200 flex justify-center items-center"><img width={60} src={data.SpecImage} alt="" /></div>
          <div className="border-2 border-gray-500 w-[60%] h-[60px] text-gray-200 pl-2">{data.SpecDescription}</div>
          </div>
           
          </>
        ))}
      </div>
    </div>
  );
}

export default AdminSpecialities;
