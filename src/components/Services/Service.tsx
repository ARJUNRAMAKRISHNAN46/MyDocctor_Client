function Service() {
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
        <div className="m-4 h-72">
          <img
            className="object-contain image-fluid"
            src="../../../src/assets/features/baby.png"
            alt=""
          />
          <h1 className="text-xl font-semibold">Child care</h1>
          <p className="text-sm text-gray-600">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
        </div>
        <div className="m-4">
          <img
            className="object-contain image-fluid"
            src="../../../src/assets/features/feature-01.jpg"
            alt=""
          />
          <h1 className="text-xl font-semibold">Casuality</h1>
          <p className="text-sm text-gray-600">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
        </div>
        <div className="m-4">
          <img
            className="object-contain image-fluid"
            src="../../../src/assets/features/feature-02.jpg"
            alt=""
          />
         <h1 className="text-xl font-semibold">Heart care</h1>
          <p className="text-sm text-gray-600">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
        </div>
        <div className="m-4 h-72">
          <img
            className="object-contain image-fluid"
            src="../../../src/assets/features/feature-03.jpg"
            alt=""
          />
          <h1 className="text-xl font-semibold">Checkups</h1>
          <p className="text-sm text-gray-600">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
        </div>
        <div className="m-4">
          <img
            className="object-contain image-fluid"
            src="../../../src/assets/features/feature-05.jpg"
            alt=""
          />
          <h1 className="text-xl font-semibold">Surgeries</h1>
          <p className="text-sm text-gray-600">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
        </div>
        <div className="m-4">
          <img
            className="object-contain image-fluid"
            src="../../../src/assets/features/feature-06.jpg"
            alt=""
          />
          <h1 className="text-xl font-semibold">Medicines</h1>
          <p className="text-sm text-gray-600">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
        </div>
      </div>
    </div>
  );
}

export default Service;
