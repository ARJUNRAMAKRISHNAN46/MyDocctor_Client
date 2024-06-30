import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { listDoctorsForSideBar } from "../../redux/actions/AppointmentActions";
import { useEffect, useState } from "react";
import { UserData } from "../../types/userData";
import { useNavigate } from "react-router-dom";

function FavouriteDoctors() {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const [doctors, setDoctors] = useState<UserData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listDoctorsForSideBar(userData?._id)).then((res) => {
      setDoctors(res.payload?.data);
    });
  }, [dispatch]);

  const viewProfile = (doctorId: string) => {
    navigate(`/view-doctor-profile/${doctorId}`);
  };

  return (
    <div className="bg-white h-[100vh]">
      <div className="flex">
        {doctors.map((doctor: UserData) => (
          <div
            key={doctor._id}
            className="border-2 md:m-4 m-1 md:p-4 md:w-[280px]"
          >
            <div className="flex justify-center py-6">
              <img
                className="md:w-[200px] w-36 h-36 md:h-[200px] object-cover image-fluid"
                src={doctor.profilePhoto}
                alt={doctor.name}
              />
            </div>
            <h1 className="font-semibold text-center">
              {doctor.name.toUpperCase()}
            </h1>
            <h1 className="text-sm font-semibold text-red-500 text-center">
              {doctor.expertise?.toUpperCase()}
            </h1>
            <h1 className="text-sm text-center">
              {doctor.city && doctor.city.toUpperCase()}
            </h1>
            <div>
              <button
                onClick={() => viewProfile(String(doctor._id))}
                className="bg-blue-600 mt-4 text-white w-full py-1 rounded-[5px]"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavouriteDoctors;
