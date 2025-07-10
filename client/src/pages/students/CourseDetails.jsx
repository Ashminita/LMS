import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/students/Footer";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});

  const [isAlreadyEnrolled, setisAlreadyEnrolled] = useState(false);

  const {
    allCourses,
    calculateRating,
    calculateNoofLectures,
    calculateCourseDuration,
    calculateChapterTime,
    currency,
    backendUrl,
    userData,
    getToken
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    try {
      const{data}=await axios.get(backendUrl+'/api/course/'+id)

      if(data.success){
        setCourseData(data.courseData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  };

  const enrollCourse=async()=>{
    try {
      if(!userData){
        return toast.warn('Login to Enroll')
      }
      if(isAlreadyEnrolled){
        return toast.warn('Already Enrolled')
      }
      const token =await getToken();

      const {data}=await axios.post(backendUrl+'/api/user/purchase',{courseId:
        courseData._id
      },{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        const{session_url}=data
        window.location.replace(session_url)
      }else{
        toast.error(data.message);
        
      }
    } catch (error) {
      toast.error(error.message)
    }
  }



  useEffect(() => {
    fetchCourseData();
  }, []);
  useEffect(() => {
    if(userData && courseData){
      setisAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id))
    }
  }, [userData,courseData]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="bg-gray-50 px-4 py-6 lg:px-16 flex flex-col lg:flex-row gap-10">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              {courseData.courseTitle}
            </h1>
            <p
              className="text-gray-600 mt-2"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription.slice(0, 200),
              }}
            ></p>
            {/* Ratings */}
            <div className="flex items-center space-x-3 mt-3">
              <p className="text-sm font-medium text-gray-800">
                {calculateRating(courseData)}
              </p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < Math.floor(calculateRating(courseData))
                        ? assets.star
                        : assets.star_blank
                    }
                    alt=""
                    className="w-4 h-4"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500">
              ({courseData.courseRatings.length}
              {courseData.courseRatings.length > 1 ? " ratings" : " rating"})
            </p>
            <p className="text-sm text-gray-500">
  {courseData.enrolledStudents?.length || 0}
  {courseData.enrolledStudents?.length === 1 ? " student" : " students"}
</p>

          </div>

          <p className="text-sm text-gray-600">
            Course by{" "}
            <span className="font-medium text-blue-600">{courseData.educator.name}</span>
          </p>

          {/* Course Structure */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Course Structure
            </h2>
            <div className="space-y-2">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div
                    className="flex justify-between items-center bg-white px-4 py-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`w-4 h-4 transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow_icon"
                      />
                      <p className="font-medium text-gray-800">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 bg-gray-50 ${
                      openSections[index] ? "max-h-96 p-4" : "max-h-0 p-0"
                    }`}
                  >
                    <ul className="space-y-3">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <img
                            src={assets.play_icon}
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {lecture.lectureTitle}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              {lecture.isPreviewFree && (
                                <p className="text-green-600 font-semibold">
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              Course Description
            </h3>
            <p
              className="text-gray-700 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[350px] space-y-4">
          <img
            src={courseData.courseThumbnail}
            alt=""
            className="rounded-lg shadow-md w-full"
          />

          <div className="bg-white shadow p-5 rounded-md border border-gray-100 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={assets.time_left_clock_icon}
                alt=""
                className="w-5 h-5"
              />
              <p className="text-sm text-gray-600">
                <span className="font-medium text-red-500">5 days</span> left at
                this price!
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-800">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="line-through text-sm text-gray-400">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="text-sm text-green-600 font-medium">
                {courseData.discount}% off
              </p>
            </div>

            <div className="flex flex-col gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <img src={assets.star} alt="" className="w-4 h-4" />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className="flex items-center gap-3">
                <img src={assets.time_clock_icon} alt="" className="w-4 h-4" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="flex items-center gap-3">
                <img src={assets.lesson_icon} alt="" className="w-4 h-4" />
                <p>{calculateNoofLectures(courseData)} lessons</p>
              </div>
            </div>

            <button onClick={enrollCourse} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 font-semibold">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
