import { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorSearch.css";
import ListDoctors from "../common/ListDoctors";
import { AddSpeciality, UserData } from "../../types/userData";
import { useNavigate } from "react-router-dom";
import { Country } from "country-state-city";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { listSpeciality } from "../../redux/actions/UserActions";

const DoctorSearch = () => {
  const [doctors, setDoctors] = useState<UserData[]>([]);
  const [specs, setSpecs] = useState<AddSpeciality[]>([]);
  const [filters, setFilters] = useState({
    name: "",
    country: "",
    expertise: "",
    sort: "",
    consultationType: [],
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listSpeciality()).then((res) => {
      setSpecs(res.payload.data);
    });
  }, [dispatch]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/doctor/api/filter-doctors",
          {
            params: {
              name: filters.name,
              country: filters.country,
              expertise: filters.expertise,
              sort: filters.sort,
              consultationType: filters.consultationType.join(","),
            },
          }
        );
        setDoctors(response.data?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctors();
    const queryString = new URLSearchParams(filters).toString();
    navigate(`?${queryString}`);
  }, [filters, navigate]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleCheckboxChange = (e: any) => {
    const { value, checked } = e.target;
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      consultationType: checked
        ? [...prevFilters.consultationType, value]
        : prevFilters.consultationType.filter((type) => type !== value),
    }));
  };

  return (
    <div className="md:flex">
      <div className="filter-section h-80 shadow-xl hidden md:block">
        <h3>Filter Doctors</h3>
        <input
          name="name"
          placeholder="Enter doctor name"
          onChange={handleInputChange}
          className="bg-white"
        />
        <select
          name="country"
          className="bg-white py-2.5 rounded outline-none border border-gray-300 w-60"
          onChange={handleSelectChange}
        >
          <option value="">Select Country</option>
          {Country.getAllCountries().map((country) => (
            <option key={country.isoCode} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <select
          name="expertise"
          className="bg-white py-2.5 rounded outline-none border border-gray-300 w-60 mt-2.5"
          onChange={handleSelectChange}
        >
          <option value="">Select Speciality</option>
          {specs.map((spec) => (
            <option key={spec._id} value={spec.specialtyName}>
              {spec.specialtyName}
            </option>
          ))}
        </select>
        <div className="sort-section">
          <label>Sort with Name:</label>
          <button
            name="sort"
            value="A-Z"
            onClick={() => setFilters({ ...filters, sort: "A-Z" })}
          >
            A - Z
          </button>
          <button
            name="sort"
            value="Z-A"
            onClick={() => setFilters({ ...filters, sort: "Z-A" })}
          >
            Z - A
          </button>
        </div>
      </div>
      <div className="">
        <ListDoctors doctors={doctors} />
      </div>
    </div>
  );
};

export default DoctorSearch;


//STARTER CODE FOR DOCTOR FILTER

// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./DoctorSearch.css";
// import ListDoctors from "../common/ListDoctors";
// import { UserData } from "../../types/userData";
// import { useNavigate } from 'react-router-dom';

// const DoctorSearch = () => {
//   const [doctors, setDoctors] = useState<UserData[]>([]);
//   const [filters, setFilters] = useState({
//     name: "",
//     country: "",
//     expertise: "",
//     sort: "",
//     consultationType: [],
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDoctors();
//     const queryString = new URLSearchParams(filters).toString();
//     navigate(`?${queryString}`);
// }, [filters, navigate]);

//   const fetchDoctors = async () => {
//     const response = await axios.get(
//       "http://localhost:8080/doctor/api/filter-doctors",
//       {
//         params: {
//           name: filters.name,
//           country: filters.country,
//           expertise: filters.expertise,
//           sort: filters.sort,
//           consultationType: filters.consultationType.join(","),
//         },
//       }
//     );
//     console.log("🚀 ~ fetchDoctors ~ response:", response);
//     setDoctors(response.data?.data);
//   };

//   const handleFilterChange = (e: any) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFilters({
//         ...filters,
//         consultationType: checked
//           ? [...filters.consultationType, value]
//           : filters.consultationType.filter((type) => type !== value),
//       });
//     } else {
//       setFilters({ ...filters, [name]: value });
//     }
//   };

//   return (
//     <div className="md:flex">
//       <div className="filter-section h-80 shadow-xl hidden md:block">
//         <h3>Filter Doctors</h3>
//         <input
//           name="name"
//           placeholder="Enter doctor name"
//           onChange={handleFilterChange}
//           className="bg-white"
//         />
//         <input
//           name="country"
//           placeholder="Enter country name"
//           onChange={handleFilterChange}
//           className="bg-white"
//         />
//         <input
//           name="expertise"
//           placeholder="Enter speciality"
//           onChange={handleFilterChange}
//           className="bg-white"
//         />
//         <div className="sort-section">
//           <label>Sort with Name:</label>
//           <button
//             name="sort"
//             value="A-Z"
//             onClick={() => setFilters({ ...filters, sort: "A-Z" })}
//           >
//             A - Z
//           </button>
//           <button
//             name="sort"
//             value="Z-A"
//             onClick={() => setFilters({ ...filters, sort: "Z-A" })}
//           >
//             Z - A
//           </button>
//         </div>
//       </div>
//       <div className="">
//         <ListDoctors doctors={doctors} />
//       </div>
//     </div>
//   );
// };

// export default DoctorSearch;
