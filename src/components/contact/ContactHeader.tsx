import banner from "../../../src/assets/banners/banner.jpg";

function ContactHeader() {
  return (
    <div className="bg-white">
      <div
        className="h-72 "
        style={{
          backgroundImage: `url(${banner})`
        }}
      >
        <div className="w-full h-full bg-blue-950 opacity-80 flex items-center justify-center">
          <div>
            <h1 className="text-center font-bold text-[40px] text-white">
              CONTACT US
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
    </div>
  )
}

export default ContactHeader
