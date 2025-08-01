import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/students/Footer";
import Rating from "../../components/students/Rating";
import axios from "axios";
import Loading from "../../components/students/Loading";
import { toast } from "react-toastify";

const Player = () => {
  const {
    enrolledCourses,
    calculateChapterTime,
    backendUrl,
    getToken,
    userData,
    fetchUserEnrolledCourse,
  } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
        course.courseRatings.map((item) => {
          if (item.userId === userData._id) {
            setInitialRating(item.rating);
          }
        });
      }
    });
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses]);

  const markLectureAsCompleted = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/update-course-progress",
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/get-course-progress",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  const handleRate = async (rating) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/add-rating",
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserEnrolledCourse();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCourseProgress();
  }, []);

  return courseData ? (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-[#f4f8fd] p-6 gap-6">
  {/* left column */}
  <div className="w-full md:w-2/5 bg-white rounded-xl shadow-md p-4 overflow-y-auto max-h-screen">
    <h2 className="text-2xl font-semibold mb-4 text-[#1d3557] border-b pb-2">
      Course Structure
    </h2>

    <div className="space-y-2">
      {courseData &&
        courseData.courseContent.map((chapter, index) => (
          <div
            key={index}
            className="border border-[#dbe7fb] rounded-lg overflow-hidden"
          >
            <div
              className="flex justify-between items-center bg-white px-4 py-3 cursor-pointer hover:bg-[#f1f5fb] transition"
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
                <p className="font-medium text-[#1d3557]">
                  {chapter.chapterTitle}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {chapter.chapterContent.length} lectures -{" "}
                {calculateChapterTime(chapter)}
              </p>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 bg-[#f9fbff] ${
                openSections[index] ? "max-h-96 p-4" : "max-h-0 p-0"
              }`}
            >
              <ul className="space-y-3">
                {chapter.chapterContent.map((lecture, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <img
                      src={
                        progressData && progressData.lectureCompleted.includes(playerData.lectureId)
                          ? assets.blue_tick_icon
                          : assets.play_icon
                      }
                      alt="play icon"
                      className="w-4 h-4 mt-1"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#2f3e54]">
                        {lecture.lectureTitle}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {lecture.lectureUrl && (
                          <p
                            onClick={() =>
                              setPlayerData({
                                ...lecture,
                                chapter: index + 1,
                                lecture: i + 1,
                              })
                            }
                            className="text-[#2a9d8f] font-semibold cursor-pointer hover:underline"
                          >
                            Watch
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

    <div className="mt-6 border-t pt-4">
      <h1 className="text-lg font-medium text-[#1d3557] mb-2">
        Rate this Course:
      </h1>
      <Rating initialRating={initialRating} onRate={handleRate} />
    </div>
  </div>

  {/* right column */}
  <div className="w-full md:w-3/5 bg-white rounded-xl shadow-md p-4">
    {playerData ? (
      <div>
        <YouTube
          videoId={playerData.lectureUrl.split("/").pop()}
          iframeClassName="w-full aspect-video rounded-lg"
        />
        <div className="mt-4">
          <p className="text-lg font-semibold text-[#1d3557] mb-2">
            {playerData.chapter}.{playerData.lecture}{" "}
            {playerData.lectureTitle}
          </p>
          <button
            onClick={() => markLectureAsCompleted(playerData.lectureId)}
            className="bg-[#457b9d] hover:bg-[#1d3557] text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            {progressData && progressData.lectureCompleted.includes(playerData.lectureId)
              ? "Completed"
              : "Mark Complete"}
          </button>
        </div>
      </div>
    ) : (
      <img
        src={courseData ? courseData.courseThumbnail : ""}
        alt=""
        className="w-full h-auto object-cover rounded-lg"
      />
    )}
  </div>
</div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Player;
