import { useEffect, useState } from "react";
import Card from "../common/Card";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { listService } from "../../redux/actions/UserActions";
import { AddService } from "../../types/userData";
import { IoIosArrowForward } from "react-icons/io";
import ServiceModal from "../modal/ServiceModal";

function AdminServices() {
  const [showBtn, setShowBtn] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [service, setService] = useState<AddService[]>();

  useEffect(() => {
    dispatch(listService()).then((res) => {
      setService(res.payload?.data);
    });
  }, [dispatch]);

  const handleBtnClick = () => {
    setShowBtn(!showBtn);
  };
  console.log(service, "=specifdsdsfhdsfiugdsifufdsgbfiuygsf");

  return (
    <div className="min-h-[150vh] bg-gray-700 flex justify-center items-center p-3">
      <div className=" bg-gray-800 min-h-[146vh]">
        <div className="flex justify-between">
          <div className="flex items-center py-4 ml-6">
            <h1 className="text-white font-bold">ADMIN</h1>
            <IoIosArrowForward className="text-xl text-white" />
            <h1 className="text-white font-bold">SERVICES</h1>
          </div>
          <button
            onClick={handleBtnClick}
            className="bg-blue-600 m-6 text-white font-semibold px-4 py-1 rounded-[5px]"
          >
            Add Speciality
          </button>
        </div>
        <div>
          {showBtn && (
            <ServiceModal
              isOpen={true}
              onClose={() => {
                setShowBtn(false);
              }}
            />
          )}
        </div>
        <div className="md:px-16 grid grid-cols-3">
          {service?.map((svc) => (
            <Card
              specialtyName={svc?.serviceName}
              specialtyDescription={svc?.serviceDescription}
              specialtyImage={svc?.serviceImage}
              _id={svc?._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminServices;
