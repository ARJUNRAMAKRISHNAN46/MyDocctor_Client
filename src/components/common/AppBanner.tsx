function AppBanner() {
  return (
    <div className="w-full h-full bg-cover bg-no-repeat flex justify-center items-center" style={{ backgroundImage: `url('../../../src/assets/doctor_banner.jpg')` }}>
      <div className="w-full px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Stay at Home. Consult Doctors Online.</h1>
        <div className="flex justify-center">
          <input
            type="text"
            className="w-[700px] bg-gray-200 border border-gray-500 h-10 md:rounded-[5px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for any health keyword"
          />
          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Search</button>
        </div>
        <h2 className="text-2xl font-semibold text-white text-center mt-12">Trending Topics</h2>
      </div>
    </div>
  );
}

export default AppBanner;
