import { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorSearch.css";
import ListDoctors from "../common/ListDoctors";
import { UserData } from "../../types/userData";
import { useNavigate } from 'react-router-dom';

const DoctorSearch = () => {
  const [doctors, setDoctors] = useState<UserData[]>([]);
  const [filters, setFilters] = useState({
    name: "",
    country: "",
    expertise: "",
    sort: "",
    consultationType: [],
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    fetchDoctors();
    const queryString = new URLSearchParams(filters).toString();
    navigate(`?${queryString}`);
}, [filters, navigate]);
  
  const fetchDoctors = async () => {
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
    console.log("🚀 ~ fetchDoctors ~ response:", response);
    setDoctors(response.data?.data);
  };

  const handleFilterChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFilters({
        ...filters,
        consultationType: checked
          ? [...filters.consultationType, value]
          : filters.consultationType.filter((type) => type !== value),
      });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  return (
    <div className="md:flex">
      <div className="filter-section h-80 shadow-xl hidden md:block">
        <h3>Filter Doctors</h3>
        <input
          name="name"
          placeholder="Enter doctor name"
          onChange={handleFilterChange}
        />
        <input
          name="country"
          placeholder="Enter country name"
          onChange={handleFilterChange}
        />
        <input
          name="expertise"
          placeholder="Enter speciality"
          onChange={handleFilterChange}
        />
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
