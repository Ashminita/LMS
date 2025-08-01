import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const {allCourses}=useContext(AppContext)
  return (
    <div className="py-16 md:px-40 px-8 bg-[#0E1116] text-center md:text-left">
  <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00C6FF] to-[#6D5BFF]">
    Learn from the best
  </h2>
  <p className="text-sm md:text-base text-[#B0BEC5] mt-3">
    Discover our top-rated course across various categories. From coding and
    design to <br className="hidden md:block" /> business and wellness, our
    courses are crafted to deliver results.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-6">
    {allCourses.slice(0, 4).map((course, index) => (
      <CourseCard key={index} course={course} />
    ))}
  </div>

  <Link
    to={"/course-list"}
    onClick={() => scrollTo(0, 0)}
    className="text-[#80D8FF] border border-[#2F3C4C] hover:border-[#00C6FF] hover:text-[#00C6FF] px-10 py-3 rounded transition duration-300"
  >
    Show all courses
  </Link>
</div>

  );
};

export default CoursesSection;
