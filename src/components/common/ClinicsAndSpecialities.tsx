import spec1 from "../../../src/assets/Specialities/specialities-01.png";
import spec2 from "../../../src/assets/Specialities/specialities-02.png";
import spec3 from "../../../src/assets/Specialities/specialities-03.png";
import spec4 from "../../../src/assets/Specialities/specialities-04.png";
import spec5 from "../../../src/assets/Specialities/specialities-05.png";

function ClinicsAndSpecialities() {
  return (
    <div className="bg-white">
      <div>
        <h1 className="text-center text-blue-900 font-bold text-[30px]">
          Clinic and Specialities
        </h1>
        <div className="flex justify-center mt-2 mb-2">
          <div className="boder-2 h-1 w-20 bg-gray-300"></div>
          <div className="boder-2 h-1 w-20 bg-blue-800"></div>
          <div className="boder-2 h-1 w-20 bg-gray-300"></div>
        </div>
        <p className="text-center text-gray-600 text-sm mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </p>
      </div>
      <div className="grid md:grid-cols-5 grid-cols-2 px-6 bg-red-50 md:px-72">
        <div>
          <div className="rounded-full hover:scale-105 p-10 m-4 md:mt-28 bg-white shadow-2xl">
            <img className="image-fluid " src={spec1} alt={spec1} />
          </div>
          <h1 className="text-center md:mt-4 md:mb-28 font-semibold text-gray-600 ">
            Urology
          </h1>
        </div>
        <div>
          <div className="rounded-full hover:scale-105 p-10 m-4 md:mt-28 bg-white shadow-2xl">
            <img className="image-fluid " src={spec2} alt={spec2} />
          </div>
          <h1 className="text-center mt-4 md:mb-28 font-semibold text-gray-600 ">
            Neurology
          </h1>
        </div>
        <div>
          <div className="rounded-full hover:scale-105 p-10 m-4 md:mt-28 bg-white shadow-2xl">
            <img className="image-fluid " src={spec3} alt={spec3} />
          </div>
          <h1 className="text-center mt-4 md:mb-28 font-semibold text-gray-600 ">
            Orthopedic
          </h1>
        </div>
        <div>
          <div className="rounded-full hover:scale-105 p-10 m-4 md:mt-28 bg-white shadow-2xl">
            <img className="image-fluid " src={spec4} alt={spec4} />
          </div>
          <h1 className="text-center mt-4 md:mb-28 font-semibold text-gray-600 ">
            Cardiologist
          </h1>
        </div>
        <div>
          <div className="rounded-full hover:scale-105 p-10 m-4 md:mt-28 bg-white shadow-2xl">
            <img className="image-fluid " src={spec5} alt={spec5} />
          </div>
          <h1 className="text-center mt-4 md:mb-28 font-semibold text-gray-600 ">
            Dentist
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ClinicsAndSpecialities;

{
  /* <div className="rounded-full bg-white m-4 p-10 shadow-2xl">
  <img className="w-16 h-16"
    src="../../../src/assets/Specialities/specialities-02.png"
    alt=""
  />
  <h1>Neurology</h1>
</div>
<div className="rounded-full bg-white m-4 p-10 shadow-2xl">
  <img className="w-16 h-16"
    src="../../../src/assets/Specialities/specialities-03.png"
    alt=""
  />
  <h1>Orthopedic</h1>
</div>
<div className="rounded-full bg-white m-4 p-10 shadow-2xl">
  <img className="w-16 h-16"
    src="../../../src/assets/Specialities/specialities-04.png"
    alt=""
  />
  <h1>Cardiologist</h1>
</div>
<div className="rounded-full bg-white m-4 p-10 shadow-2xl">
  <img className="w-16 h-16"
    src="../../../src/assets/Specialities/specialities-05.png"
    alt=""
  />
  <h1>Dentist</h1>
</div> */
}
