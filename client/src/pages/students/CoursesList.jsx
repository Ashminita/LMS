import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/students/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/students/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/students/Footer";

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();

  // filtered course list

  const [filteredCourse, setFilteredCourse] = useState([]);
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="min-h-screen bg-[#0E1116] px-4 py-6 md:px-10 lg:px-20 text-white">
  <div className="mb-6">
    <div className="mb-4">
      <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00C6FF] to-[#6D5BFF]">
        Course List
      </h1>
      <p className="text-sm text-[#90A4AE]">
        <span
          className="text-[#00C6FF] cursor-pointer hover:underline"
          onClick={() => navigate("/")}
        >
          Home
        </span>
        <span className="mx-1 text-[#90A4AE]">/</span>
        <span className="text-[#B0BEC5]">Course List</span>
      </p>
    </div>
    <SearchBar data={input} />
  </div>

  {input && (
    <div className="flex items-center justify-between bg-[#1A1D23] p-3 rounded-md shadow-sm mb-4 border border-[#2F3C4C]">
      <p className="text-sm font-medium text-[#80D8FF]">{input}</p>
      <img
        src={assets.cross_icon}
        alt=""
        className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform duration-150"
        onClick={() => navigate("/course-list")}
      />
    </div>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {filteredCourse.map((course, index) => (
      <CourseCard key={index} course={course} />
    ))}
  </div>
</div>
<Footer />

    </>
  );
};

export default CoursesList;
