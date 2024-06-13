import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
// import toast from "react-hot-toast";
import axios from "axios";

function SearchInput() {
  const [search, setSearch] = useState<string>("");

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    await axios.post("")

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <FaSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput;
