import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";

function Reviews() {
  return (
    <div>
      <div className="mb-1 md:mb-6 md:p-8">
        <h1 className="text-[12px] md:text-[24px] font-bold ml-1">Reviews</h1>
        <div className="md:flex">
          <div className="mb-1 md:w-[30%] bg-red-100 h-[180px] border rounded-lg flex p-2 m-2">
            <div className="w-[320px] ">
              <img
                className=" border rounded-full md:h-[70px] md:w-[70px]"
                // width={60}
                src="../../src/assets/yash.jpeg"
                alt=""
              />
            </div>
            <div className="ml-0.5 md:ml-4">
              <h1 className="text-[10px] md:text-[20px] font-bold">
                Rithick Gauda
              </h1>
              <div className="flex">
                <TiStarFullOutline className="md:mb-4 text-yellow-500" />
                <TiStarFullOutline className="md:mb-4 text-yellow-500" />
                <TiStarFullOutline className="md:mb-4 text-yellow-500" />
                <TiStarFullOutline className="md:mb-4 text-yellow-500" />
                <TiStarFullOutline className="md:mb-4 text-yellow-500" />
              </div>
              <p className="text-[8px] md:text-[16px] leading-none">
                Excellent app. It is of a great help as going to the hospitals
                are risky nowadays. Easy to use app. The patient care department
                is top- notch. The app has a great number doctors. Would
                definitely share this app among friends.
              </p>
            </div>
          </div>
          <div className="mb-1 md:w-[30%] bg-red-100 h-[180px] border rounded-lg flex p-2 m-2">
            <div className="w-[320px] ">
              <img
                className=" border rounded-full md:h-[70px] md:w-[70px]"
                // width={60}
                src="../../src/assets/dhanush.jpeg"
                alt=""
              />
            </div>
            <div className="ml-0.5 md:ml-4">
              <h1 className="text-[10px] md:text-[20px] font-bold">
                Hareesh Kumar
              </h1>
              <div className="flex">
                <TiStarFullOutline className="md:mb-4 text-yellow-500" />
                <TiStarFullOutline className="md:mb-4 text-yellow-500" />
                <TiStarFullOutline className="md:mb-4 text-yellow-500" />
                <TiStarOutline className="md:mb-4 text-yellow-500" />
                <TiStarOutline className="md:mb-4 text-yellow-500" />
              </div>
              <p className="text-[8px] md:text-[16px] leading-none">
                Excellent app. It is of a great help as going to the hospitals
                are risky nowadays. Easy to use app. The patient care department
                is top- notch. The app has a great number doctors. Would
                definitely share this app among friends.
              </p>
            </div>
          </div>
          <div className="mb-1 md:w-[30%] bg-red-100 h-[180px] border rounded-lg flex p-2 m-2">
            <div className="w-[320px] ">
              <img
                className=" border rounded-full md:h-[70px] md:w-[70px]"
                // width={60}
                src="../../src/assets/vijay.jpeg"
                alt=""
              />
            </div>
            <div className="ml-0.5 md:ml-4">
              <h1 className="text-[10px] md:text-[20px] font-bold">
                Dhurga
              </h1>
              <div className="flex">
                <TiStarFullOutline className="md:mb-4 text-yellow-500" />
                <TiStarFullOutline className="md:mb-4 text-yellow-500" />
                <TiStarFullOutline className="md:mb-4 text-yellow-500" />
                <TiStarFullOutline className="md:mb-4 text-yellow-500" />
                <TiStarOutline className="md:mb-4 text-yellow-500" />
              </div>
              <p className="text-[8px] md:text-[16px] leading-none">
                Excellent app. It is of a great help as going to the hospitals
                are risky nowadays. Easy to use app. The patient care department
                is top- notch. The app has a great number doctors. Would
                definitely share this app among friends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
