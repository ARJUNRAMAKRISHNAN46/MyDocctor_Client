
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { listDoctor } from "../../redux/actions/DoctorActions";
import { UserData } from "../../types/userData";

function ListDoctors() {
  const [doctors, setDoctors] = useState<never[]>([]);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(listDoctor())
      .then((res) => {
        setDoctors(res.payload.data);
        console.log("🚀 ~ dispatch ~ doctor ~ res:", res.payload.data);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ err:", err);
      });
  }, [dispatch]);

  const viewProfile = (doctorId: string) => {
    console.log("🚀 ~ viewProfile ~ doctorId:", doctorId);
    navigate(`/view-doctor-profile/${doctorId}`);
  };

  return (
    <div>
      <div className="grid md:grid-cols-4 grid-cols-2">
        {doctors.map((doctor: UserData) => (
          <div className="shadow-xl m-4 w-[280px]">
            <div className="flex justify-center py-6">
              <img
                className="w-[200px] h-[200px] object-cover image-fluid "
                src={doctor?.profilePhoto}
                alt=""
              />
            </div>
            <h1 className="font-semibold text-center">{doctor?.name.toUpperCase()}</h1>
            <h1 className="text-sm font-semibold text-red-500 text-center">{doctor?.expertise?.toUpperCase()}</h1>
            <h1 className="text-sm text-center">{doctor?.city && doctor?.city.toUpperCase()}</h1>
            <div>
              <button onClick={() => viewProfile(String(doctor?._id))} className="bg-blue-600 mt-4  text-white w-full py-1 rounded-[5px]">View Profile</button>
            </div>
          </div>
        ))}
        {doctors.map((doctor: UserData) => (
          <div className="shadow-xl m-4 w-[280px]">
            <div className="flex justify-center py-6">
              <img
                className="w-[200px] h-[200px] object-cover image-fluid "
                src={doctor?.profilePhoto}
                alt=""
              />
            </div>
            <h1 className="font-semibold text-center">{doctor?.name.toUpperCase()}</h1>
            <h1 className="text-sm font-semibold text-red-500 text-center">{doctor?.expertise?.toUpperCase()}</h1>
            <h1 className="text-sm text-center">{doctor?.city && doctor?.city.toUpperCase()}</h1>
            <div>
              <button onClick={() => viewProfile(String(doctor?._id))} className="bg-blue-600 mt-4  text-white w-full py-1 rounded-[5px]">View Profile</button>
            </div>
          </div>
        ))}
        {doctors.map((doctor: UserData) => (
          <div className="shadow-xl m-4 w-[280px]">
            <div className="flex justify-center py-6">
              <img
                className="w-[200px] h-[200px] object-cover image-fluid "
                src={doctor?.profilePhoto}
                alt=""
              />
            </div>
            <h1 className="font-semibold text-center">{doctor?.name.toUpperCase()}</h1>
            <h1 className="text-sm font-semibold text-red-500 text-center">{doctor?.expertise?.toUpperCase()}</h1>
            <h1 className="text-sm text-center">{doctor?.city && doctor?.city.toUpperCase()}</h1>
            <div>
              <button onClick={() => viewProfile(String(doctor?._id))} className="bg-blue-600 mt-4 text-white w-full py-1 rounded-[5px]">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListDoctors;
