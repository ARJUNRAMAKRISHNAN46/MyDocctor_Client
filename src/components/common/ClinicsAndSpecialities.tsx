import React from "react";

function ClinicsAndSpecialities() {
  return (
    <div>
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
      <div className="flex justify-center bg-red-50">
        <div>
          <div className="rounded-full hover:scale-105 p-10 m-4 mt-28 bg-white shadow-2xl">
            <img className="image-fluid "
              src="../../../src/assets/Specialities/specialities-01.png"
              alt=""
            />
          </div>
          <h1 className="text-center mt-4 mb-28 font-semibold text-gray-600 ">Urology</h1>
        </div>
        <div>
          <div className="rounded-full hover:scale-105 p-10 m-4 mt-28 bg-white shadow-2xl">
            <img className="image-fluid "
              src="../../../src/assets/Specialities/specialities-02.png"
              alt=""
            />
          </div>
          <h1 className="text-center mt-4 mb-28 font-semibold text-gray-600 ">Neurology</h1>
        </div>
        <div>
          <div className="rounded-full hover:scale-105 p-10 m-4 mt-28 bg-white shadow-2xl">
            <img className="image-fluid "
              src="../../../src/assets/Specialities/specialities-03.png"
              alt=""
            />
          </div>
          <h1 className="text-center mt-4 mb-28 font-semibold text-gray-600 ">Orthopedic</h1>
        </div>
        <div>
          <div className="rounded-full hover:scale-105 p-10 m-4 mt-28 bg-white shadow-2xl">
            <img className="image-fluid "
              src="../../../src/assets/Specialities/specialities-04.png"
              alt=""
            />
          </div>
          <h1 className="text-center mt-4 mb-28 font-semibold text-gray-600 ">Cardiologist</h1>
        </div>
        <div>
          <div className="rounded-full hover:scale-105 p-10 m-4 mt-28 bg-white shadow-2xl">
            <img className="image-fluid "
              src="../../../src/assets/Specialities/specialities-05.png"
              alt=""
            />
          </div>
          <h1 className="text-center mt-4 mb-28 font-semibold text-gray-600 ">Dentist</h1>
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
