import { useNavigate } from "react-router-dom";
import image1 from "../../../src/assets/consultations/doc1.jpg";
import image2 from "../../../src/assets/consultations/doc4.jpg";
import image3 from "../../../src/assets/consultations/doctor 5.jpg";

const Service = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/our-service")
  }

  return (
    <section className="pt-20 bg-white">
      <div className="mb-5 section-title text-center">
        <h2>Services</h2>
        <div className="flex justify-center mt-2 mb-2">
          <div className="boder-2 h-1 w-20 bg-gray-300"></div>
          <div className="boder-2 h-1 w-20 bg-blue-800"></div>
          <div className="boder-2 h-1 w-20 bg-gray-300"></div>
        </div>
        <p className="m-0">
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </p>
      </div>
      <div className="container">
        <div className="grid md:grid-cols-3">
          <div className=" md:p-2">
            <div>
              <img
                className="image-fluid object-contain"
                src={image1}
                alt=""
              />
            </div>
            <div>
              <img
                className="image-fluid object-contain mt-4"
                src={image2}
                alt=""
              />
            </div>
          </div>
          <div className="flex items-center md:p-2 md:mt-0 mt-4">
            <img
              className="image-fluid object-contain "
              src={image3}
              alt=""
            />
          </div>
          <div className="md:p-2 flex items-center">
            <div className="m-6">
              <h1 className="font-bold text-blue-900 md:text-[50px] text-2xl">
                Personal care
              </h1>
              <h1 className="font-bold text-blue-900 md:text-[50px] text-2xl">
                healthy living
              </h1>
              <p className="text-sm font-light">
                We provide best leading medicle service Nulla perferendis veniam
                deleniti ipsum officia dolores repellat laudantium obcaecati
                neque.
              </p>
              <button onClick={handleNavigate} className="bg-blue-600 px-10 text-white text-sm font-semibold mt-10 py-2 rounded-full hover:bg-blue-500">
                SERVICES
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
