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
      <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-10 lg:px-20">
        <div className="mb-6">
          <div className="mb-4">
            <h1 className="text-3xl font-semibold text-gray-800">Course List</h1>
            <p className="text-sm text-gray-500">
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate("/")}
              >
                Home
              </span>
              <span className="mx-1">/</span>
              <span className="text-gray-700">Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        {input && (
          <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm mb-4 border border-gray-200">
            <p className="text-sm font-medium text-gray-600">{input}</p>
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
