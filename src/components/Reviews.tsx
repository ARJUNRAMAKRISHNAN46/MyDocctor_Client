import React from "react";

function Reviews() {
  return (
    <div>
      <div className="mb-1">
        <h1 className="text-[12px] font-bold ml-1">Reviews</h1>
        <div className="md:flex">
          <div className="mb-1 md:w-[23%] bg-red-100 h-[80px] border rounded-lg flex p-2 m-2">
            <div className="w-[120px]">
              <img
                className=" border rounded-full"
                width={40}
                src="../../src/assets/1580.png"
                alt=""
              />
            </div>
            <div className="ml-0.5">
              <h1 className="text-[10px] font-bold">yash</h1>
              <p className="text-[8px] leading-none">
                Excellent app. It is of a great help as going to the hospitals
                are risky nowadays. Easy to use app. The patient care department
                is top- notch. The app has a great number doctors. Would
                definitely share this app among friends.
              </p>
            </div>
          </div>
          <div className="mb-1 md:w-[23%] bg-red-100 h-[80px] border rounded-lg flex p-2 m-2">
            <div className="w-[120px]">
              <img
                className=" border rounded-full"
                width={40}
                src="../../src/assets/1580.png"
                alt=""
              />
            </div>
            <div className="ml-0.5">
              <h1 className="text-[10px] font-bold">yash</h1>
              <p className="text-[8px] leading-none">
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