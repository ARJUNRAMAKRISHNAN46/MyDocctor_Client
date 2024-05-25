import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const userData = useSelector((data: RootState) => data.userData);
  console.log(userData.user, "userdata is here");

  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link: any) => {
    setActiveLink(link);
  };

  const toHome = () => {
    navigate("/userHome");
  };


  return (
    <div className="h-16 w-full flex justify-between">
      <div onClick={toHome}>
        <img onClick={() => handleLinkClick('home')} className="object-contain w-60 h-16" src="../../../src/assets/MyDocctorLogo.png" alt="Logo" />
      </div>
      <div className="flex items-center mr-10">
        {[
          { name: 'Home', link: '/userHome' },
          { name: 'About', link: '/about-us' },
          { name: 'Service', link: '/our-service' },
          { name: 'Doctors', link: '/list-doctors' },
          { name: 'Contact', link: '/contact-us' },
          userData.user ? { name: 'Profile', link: '/view/profile' } : { name: 'Login', link: '/login' },
          { name: 'Make an Appointment', link: '', special: true },
        ].map((item) => (
          <a
            key={item.name}
            className={`text-sm md:mr-4 ${activeLink === item.name ? 'underline' : ''} ${item.special ? 'bg-blue-500 px-4 py-1 rounded-full text-white' : ''}`}
            href={item.link}
            onClick={() => handleLinkClick(item.name)}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  )
        
}

export default Navbar;
