// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./DoctorSearch.css";
// import ListDoctors from "../common/ListDoctors";
// import { AddSpeciality, UserData } from "../../types/userData";
// import { useNavigate } from "react-router-dom";
// import { Country } from "country-state-city";
// import { AppDispatch } from "../../redux/store";
// import { useDispatch } from "react-redux";
// import { listSpeciality } from "../../redux/actions/UserActions";

// const DoctorSearch = () => {
//   const [doctors, setDoctors] = useState<UserData[]>([]);
//   const [specs, setSpecs] = useState<AddSpeciality[]>([]);
//   const [filters, setFilters] = useState({
//     name: "",
//     country: "",
//     expertise: "",
//     sort: "",
//     consultationType: [],
//   });
//   const dispatch: AppDispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(listSpeciality()).then((res) => {
//       setSpecs(res.payload.data);
//     });
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get(
//           "https://localhost:8080/doctor/api/filter-doctors",
//           {
//             params: {
//               name: filters.name,
//               country: filters.country,
//               expertise: filters.expertise,
//               sort: filters.sort,
//               consultationType: filters.consultationType.join(","),
//             },
//           }
//         );
//         setDoctors(response.data?.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchDoctors();
//     const queryString = new URLSearchParams(filters).toString();
//     navigate(`?${queryString}`);
//   }, [filters, navigate]);
 
//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
//   };

//   const handleSelectChange = (e: any) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
//   };

//   return (
//     <div className="md:flex">
//       <div className="filter-section h-80 shadow-xl hidden md:block">
//         <h3>Filter Doctors</h3>
//         <input
//           name="name"
//           placeholder="Enter doctor name"
//           onChange={handleInputChange}
//           className="bg-white"
//         />
//         <select
//           name="country"
//           className="bg-white py-2.5 rounded outline-none border border-gray-300 w-60"
//           onChange={handleSelectChange}
//         >
//           <option value="">Select Country</option>
//           {Country.getAllCountries().map((country) => (
//             <option key={country.isoCode} value={country.name}>
//               {country.name}
//             </option>
//           ))}
//         </select>
//         <select
//           name="expertise"
//           className="bg-white py-2.5 rounded outline-none border border-gray-300 w-60 mt-2.5"
//           onChange={handleSelectChange}
//         >
//           <option value="">Select Speciality</option>
//           {specs.map((spec) => (
//             <option key={spec._id} value={spec.specialtyName}>
//               {spec.specialtyName}
//             </option>
//           ))}
//         </select>
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
    consultationType: [] as string[],
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
          "https://mydocctor-server-7.onrender.com/api/doctor/filter-doctors",
          // "http://localhost:8080/doctor/api/filter-doctors",
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
    const queryParams = new URLSearchParams({
      ...filters,
      consultationType: filters.consultationType.join(","),
    }).toString();
    navigate(`?${queryParams}`);
  }, [filters, navigate]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
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
