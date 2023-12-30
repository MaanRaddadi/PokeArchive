import axios from "axios";
import React from "react";
import { useState } from "react";
function SearchBar() {
  const [filteredPoke, setFilteredPoke] = useState([]);
  const [searchText, setSearchText] = useState("");

  const search = (e) => {
    setSearchText(e.target.value);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${searchText}`
    );
    console.log(data);
    setFilteredPoke(data);
  };

  return (
    <div className="flex justify-center gap-3">
      <input
        type="text"
        placeholder="Name or ID"
        className="input w-full max-w-xs bg-white text-black placeholder:text-gray-400 "
        onChange={search}
      />
      <button
        className=" searchBtn text-white font-extrabold p-2 px-3"
        onClick={fetchData}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
