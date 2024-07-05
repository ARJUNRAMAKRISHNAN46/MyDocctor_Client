import banner from "../../../src/assets/banners/banner.jpg";

function Banner() {
  return (
    <div>
      <div className="flex justify-center">
        <img src={banner} alt="app banner" />
      </div>
    </div>
  );
}

export default Banner;
