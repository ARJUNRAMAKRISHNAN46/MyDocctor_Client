export const doctors = [
    {
      doctorName: "Faiz Ibrahim",
      qualification: "MBBS MD",
      speciality: "Diabetology",
      profile: "../../../src/assets/feyz.jpeg",
      experience: 6,
    },
    {
      doctorName: "Rithick Ramanthali",
      qualification: "MBBS GM",
      speciality: "Psychologist",
      profile: "../../../src/assets/feyz.jpeg",
      experience: 6,
    },
    {
      doctorName: "Nabeel Muhammed",
      qualification: "MBBS MD MMA",
      speciality: "Diabetology",
      profile: "../../../src/assets/feyz.jpeg",
      experience: 6,
    },
    {
      doctorName: "Faiz Ibrahim",
      qualification: "MBBS MD",
      speciality: "Diabetology",
      profile: "../../../src/assets/feyz.jpeg",
      experience: 6,
    },
    {
      doctorName: "Faiz Ibrahim",
      qualification: "MBBS MD",
      speciality: "Diabetology",
      profile: "../../../src/assets/feyz.jpeg",
      experience: 6,
    },
    {
      doctorName: "Faiz Ibrahim",
      qualification: "MBBS MD",
      speciality: "Diabetology",
      profile: "../../../src/assets/feyz.jpeg",
      experience: 6,
    },
    {
      doctorName: "Faiz Ibrahim",
      qualification: "MBBS MD",
      speciality: "Diabetology",
      profile: "../../../src/assets/feyz.jpeg",
      experience: 6,
    },
    {
      doctorName: "Faiz Ibrahim",
      qualification: "MBBS MD",
      speciality: "Diabetology",
      profile: "../../../src/assets/feyz.jpeg",
      experience: 6,
    },
    
  ];
function ListDoctors() {
  return (
  <div>
    <div className="md:px-36 grid md:grid-cols-4 grid-cols-2 md:my-4">
        {doctors.map((doctor) => (
            <div className="p-3 md:w-[250px]">
                <img src={`${doctor?.profile}`} alt="doctor profile" />
                <h1 className="text-[12px] font-bold md:text-[20px]">Dr.{doctor?.doctorName}</h1>
                <h1 className="text-[12px] font-semibold md:text-[15px]">{doctor?.qualification}</h1>
                <h1 className="text-[12px] font-semibold md:text-[15px]">{doctor?.speciality}</h1>
                <button className="bg-red-500 text-white w-full py-1 rounded-[5px]">View Profile</button>
            </div>
        ))}
    </div>
  </div>
  );
}

export default ListDoctors;
