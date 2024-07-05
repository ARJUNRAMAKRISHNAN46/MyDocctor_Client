import SearchDoctors from "../doctor/SearchDoctor";
import backgroundImage from "../../../src/assets/banners/hero-bg.jpg";

function AppBanner() {
  return (
    <div
      className="w-full md:h-[650px] bg-cover bg-no-repeat p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="flex justify-start bg-yel items-end h-[300px] md:ml-32">
        <div>
          <h1 className="font-semibold md:text-xl text-gray-400 text-sm">TOTAL HEALTH CARE SOLUTION</h1>
          <h1 className="font-bold md:text-[50px] text-2xl text-blue-900">
            YOUR MOST TRUSTED
          </h1>
          <h1 className="font-bold md:text-[50px] text-2xl text-blue-900">
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
