//here all the common codes/contexts  are written

import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth ,useUser} from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl=import.meta.env.VITE_BACKEND_URL
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const {getToken}=useAuth()
  const {user}=useUser()

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData,setUserData]=useState(null)

  //Fetch All Courses
  const fetchAllCourses = async () => {
    try {
     const {data}= await axios.get(backendUrl+'/api/course/all')
     if(data.success){
      setAllCourses(data.courses)
     }else{
      toast.error(data.message)
     }
    } catch (error) {
      toast.error(error.message)
    }
  };

  // fetch userdata
  const fetchUserData=async ()=>{
    if(user.publicMetadata.role==='educator'){
      setIsEducator(true)
    }
    try {
      const token=await getToken();
      const {data}=await axios.get(backendUrl+'/api/user/data',{headers:{Authorization:`Bearer ${token}`}})

      if(data.success){
        setUserData(data.user)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // function to calculate average rating of course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return Math.floor(totalRating / course.courseRatings.length);
  };

  // function to Calculate Course Chapter Time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;

    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // function to calculate no of lectures in the course
  const calculateNoofLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  // fetch user enrolled courses
  const fetchUserEnrolledCourse=async ()=>{
    try {
      const token=await getToken();
    const {data}=await axios.get(backendUrl+'/api/user/enrolled-courses',
      {headers:{Authorization:`Bearer ${token}`}}
    )

    if(data.success){
      setEnrolledCourses(data.enrolledCourses.reverse())
    }else{
      toast.error(data.message)
    }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if(user){
      fetchAllCourses()
      fetchUserEnrolledCourse()
    }
  }, [user]);

  // const logToken=async ()=>{
  //   console.log(await getToken());
  // }

  useEffect(()=>{
    if(user){
      // logToken()
      fetchUserData()

    }
  },[user])


  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateNoofLectures,
    calculateCourseDuration,
    calculateChapterTime,
    enrolledCourses,fetchUserEnrolledCourse,
    backendUrl,userData,setUserData,getToken,fetchAllCourses
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
