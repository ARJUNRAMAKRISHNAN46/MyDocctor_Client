import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const userData = useSelector((data: RootState) => data.userData);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    navigate(link);
  };

  const toHome = () => {
    navigate("/userHome");
  };

  return (
    <div className="h-16 w-full flex justify-between">
      <div onClick={toHome}>
        <img onClick={() => handleLinkClick('/userHome')} className="object-contain w-60 h-16" src="../../../src/assets/MyDocctorLogo.png" alt="Logo" />
      </div>
      <div className="flex items-center mr-10">
        {[
          { name: 'Home', link: '/userHome' },
          { name: 'About', link: '/about-us' },
          { name: 'Service', link: '/our-service' },
          { name: 'Doctors', link: '/list-doctors' },
          { name: 'Contact', link: '/contact-us' },
          userData.user ? { name: 'Profile', link: '/view/profile' } : { name: 'Login', link: '/login' },
          { name: 'Make an Appointment', link: '/list-doctors', special: true },
        ].map((item) => (
          <div
            key={item.name}
            className={`text-sm md:mr-4 cursor-pointer ${activeLink === item.name ? 'underline' : ''} ${item.special ? 'bg-blue-500 px-4 py-1 rounded-full text-white' : ''}`}
            onClick={() => handleLinkClick(item.link)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Navbar;
