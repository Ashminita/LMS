import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({data}) => {
  const navigate=useNavigate()
  const [input,setInput]=useState(data?data:'')
  const onSearchHandler=(e)=>{
    e.preventDefault()
    navigate('/course-list/' + input)
  }
  return (
    <div>
  <form
    onSubmit={onSearchHandler}
    className="max-w-xl w-full md:h-14 h-12 flex items-center bg-[#1A1D23] border border-[#2F3C4C] rounded shadow-md"
  >
    <img
      src={assets.search_icon}
      alt="search_icon"
      className="md:w-auto w-10 px-3 opacity-80"
    />
    <input
      onChange={(e) => setInput(e.target.value)}
      value={input}
      type="text"
      placeholder="Search for courses"
      className="w-full h-full outline-none bg-transparent text-[#B0BEC5] placeholder:text-[#90A4AE] px-1"
    />
    <button
      type="submit"
      className="bg-gradient-to-r from-[#00C6FF] to-[#6D5BFF] rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1 hover:opacity-90 transition duration-300"
    >
      Search
    </button>
  </form>
</div>

  );
};

export default SearchBar;
