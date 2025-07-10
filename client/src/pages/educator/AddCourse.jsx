import React, { useContext, useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const { backendUrl, getToken } = useContext(AppContext);
  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action == "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if ((chapter.chapterId === chapterId)) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };
  const addLecture = () => {
    setChapters((chapters) =>
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(), // Make sure `uniqid` is imported or defined
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );

    setShowPopup(false);

    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!image) {
        toast.error("Thumbnail Not Selected");
      }

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("image", image);

      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/educator/add-course",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setCourseTitle("");
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        setChapters([]);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.mesage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border"
      >
        <div>
          <p className="font-semibold mb-2 text-gray-700">Course Title</p>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type here"
            required
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <p className="font-semibold mb-2 text-gray-700">Course Description</p>
          <div
            ref={editorRef}
            className="bg-white border min-h-[140px] rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500"
          ></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold mb-2 text-gray-700">Course Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              type="number"
              placeholder="0"
              required
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <p className="font-semibold mb-2 text-gray-700">Course Thumbnail</p>
            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-4 cursor-pointer"
            >
              <img src={assets.file_upload_icon} alt="" className="w-10 h-10" />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="w-16 h-16 object-cover rounded-md border"
                />
              )}
            </label>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2 text-gray-700">Discount %</p>
          <input
            onChange={(e) => setDistcount(e.target.value)}
            type="number"
            placeholder="0"
            min={0}
            max={100}
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Chapter Section */}
        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div
              key={chapterIndex}
              className="border rounded-xl p-4 mb-4 bg-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleChapter("toggle", chapter.chapterId)}
                >
                  <img
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    src={assets.dropdown_icon}
                    width={14}
                    alt=""
                    className={`transition-transform duration-300 ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                  />
                  <span className="font-semibold text-gray-800">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({chapter.chapterContent.length} Lectures)
                  </span>
                </div>
                <img
                  src={assets.cross_icon}
                  alt=""
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                />
              </div>

              {!chapter.collapsed && (
                <div className="mt-3 space-y-3">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center bg-white p-3 rounded-lg border"
                    >
                      <span className="text-sm text-gray-700">
                        {lectureIndex + 1}. {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-blue-600 underline"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img
                        src={assets.cross_icon}
                        alt=""
                        className="w-4 h-4 cursor-pointer"
                        onClick={()=>handleLecture('remove',chapter.chapterId,lectureIndex)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleLecture('add',chapter.chapterId)}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    + Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleChapter("add")}
            className="mt-2 text-green-700 font-semibold hover:underline text-sm"
          >
            + Add Chapter
          </button>
        </div>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md relative space-y-4 shadow-lg border">
              <img
                onClick={() => setShowPopup(false)}
                src={assets.cross_icon}
                alt=""
                className="w-5 h-5 absolute top-3 right-3 cursor-pointer"
              />
              <h2 className="text-lg font-semibold text-gray-800">
                Add Lecture
              </h2>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Lecture Title
                </p>
                <input
                  type="text"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureTitle: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Duration (minutes)
                </p>
                <input
                  type="number"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureDuration: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Lecture URL</p>
                <input
                  type="text"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureUrl: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      isPreviewFree: e.target.checked,
                    })
                  }
                />
                <p className="text-sm text-gray-700">Is Preview Free?</p>
              </div>
              <button
                onClick={addLecture}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        )}

        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold transition">
          ADD
        </button>
      </form>
    </div>
  );
};

// remember

export default AddCourse;
