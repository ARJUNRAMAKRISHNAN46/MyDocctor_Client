import SearchDoctors from "../doctor/SearchDoctor";

function AppBanner() {
  return (
    <div
      className="w-full md:h-[650px] bg-cover bg-no-repeat p-4"
      style={{
        backgroundImage: `url('../../../src/assets/banners/hero-bg.jpg')`,
      }}
    >
      <div className="flex justify-start bg-yel items-end h-[300px] md:ml-32">
        <div>
          <h1 className="font-semibold">TOTAL HEALTH CARE SOLUTION</h1>
          <h1 className="font-bold text-[50px] text-blue-900">
            YOUR MOST TRUSTED
          </h1>
          <h1 className="font-bold text-[50px] text-blue-900">
            HEALTH PARTNER
          </h1>
          <p className="font-semibold text-gray-700">
            A repudiandae ipsam labore ipsa voluptatum quidem quae laudantium
            quisquam aperiam maiores sunt fugit, deserunt rem suscipit placeat.
          </p>
        </div>
      </div>
      <div className="md:ml-32 mt-10">
        <div className="flex">
          <SearchDoctors />
        </div>
      </div>
    </div>
  );
}

export default AppBanner;
