import { useNavigate } from "react-router-dom";

function NavbarDropDown() {
    const navigate = useNavigate();
  const handleLinkClick = (link: string) => {
    navigate(link);
  };
  return (
    <div className="absolute right-0 z-10">
      <div className="flex justify-end">
        <div className="w-[200px] bg-gray-200">
          <div
            className="text-center border border-white py-0.5"
            onClick={() => handleLinkClick("/userHome")}
          >
            <h1>Home</h1>
          </div>
          <div
            className="text-center border border-white py-0.5"
            onClick={() => handleLinkClick("/about-us")}
          >
            <h1>About</h1>
          </div>
          <div
            className="text-center border border-white py-0.5"
            onClick={() => handleLinkClick("/our-service")}
          >
            <h1>Service</h1>
          </div>
          <div
            className="text-center border border-white py-0.5"
            onClick={() => handleLinkClick("/list-doctors")}
          >
            <h1>Doctors</h1>
          </div>
          <div
            className="text-center border border-white py-0.5"
            onClick={() => handleLinkClick("/contact-us")}
          >
            <h1>Contact</h1>
          </div>
          <div
            className="text-center border border-white py-0.5"
            onClick={() => handleLinkClick("/view/profile")}
          >
            <h1>Profile</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarDropDown;
