import { useEffect, useState } from "react";
import { listService } from "../../redux/actions/UserActions";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { AddService } from "../../types/userData";

function Service() {
  const dispatch: AppDispatch = useDispatch();
  const [service, setService] = useState<AddService[]>();

  useEffect(() => {
    dispatch(listService()).then((res) => {
      setService(res.payload?.data);
    });
  }, [dispatch]);

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
              SERVICES
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
      <div className="px-20 grid md:grid-cols-3">
        {service?.map((svc) => (
          <div className="m-2 p-2 rounded shadow-md">
            <img
              className="object-contain image-fluid"
              src={svc?.serviceImage}
              alt=""
            />
            <h1 className="font-semibold">{svc?.serviceName}</h1>
            <p className="text-sm text-gray-600">{svc?.serviceDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Service;
