import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);
  return (
    <Link
  to={"/course/" + course._id}
  onClick={() => scrollTo(0, 0)}
  className="border border-[#2F3C4C] bg-[#1A1D23] pb-6 overflow-hidden rounded-lg hover:shadow-lg transition duration-300"
>
  <img className="w-full" src={course.courseThumbnail} alt="" />
  <div className="p-3 text-left space-y-1">
    <h3 className="text-base font-semibold text-[#80D8FF]">
      {course.courseTitle}
    </h3>
    <p className="text-[#B0BEC5]">{course.educator.name}</p>
    <div className="flex items-center space-x-2">
      <p className="text-[#90A4AE]">{calculateRating(course)}</p>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src={
              i < Math.floor(calculateRating(course))
                ? assets.star
                : assets.star_blank
            }
            alt=""
            className="w-3.5 h-3.5"
          />
        ))}
      </div>
    </div>
    <p className="text-[#78909C]">{course.courseRatings.length}</p>
  </div>
  <p className="text-base font-semibold text-[#00C6FF] px-3">
    {currency}
    {(
      course.coursePrice -
      (course.discount * course.coursePrice) / 100
    ).toFixed(2)}
  </p>
</Link>

  );
};

export default CourseCard;
