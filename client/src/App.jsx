import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/students/Home'
import CourseList from './pages/students/CoursesList'
import CourseDetails from './pages/students/CourseDetails'
import MyEnrollments from './pages/students/MyEnrollments'
import Player from './pages/students/Player'
import Loading from './components/students/Loading'
import AddCourse from './pages/educator/AddCourse'
import Dashboard from './pages/educator/Dashboard'
import Educator from './pages/educator/Educator'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Navbar from './components/students/Navbar'
import { useMatch } from 'react-router-dom'
import "quill/dist/quill.snow.css";
import { ToastContainer} from 'react-toastify';

const App = () => {
  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div className='text-[#1c2d47] min-h-screen bg-[#f5faff]'>
      <ToastContainer/>
      {!isEducatorRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/course-list' element={<CourseList/>}/>
        <Route path='/course-list/:input' element={<CourseList/>}/>
        <Route path='/course/:id' element={<CourseDetails/>}/>
        <Route path='/my-enrollments' element={<MyEnrollments/>}/>
        <Route path='/player/:courseId' element={<Player/>}/>
        <Route path='/loading/:path' element={<Loading/>}/>
        <Route path='/educator' element={<Educator/>}>
             <Route path='/educator' element={<Dashboard/>}/>
             <Route path='add-course' element={<AddCourse/>}/>
             <Route path='my-courses' element={<MyCourses/>}/>
             <Route path='student-enrolled' element={<StudentsEnrolled/>}/>



        </Route>

      </Routes>
    </div>
  )
}

export default App
