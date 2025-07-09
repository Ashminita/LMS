import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/students/Loading'

const MyCourses = () => {
  
  const {currency,allCourses}=useContext(AppContext)

  const [courses,setCourses]=useState(null)

  const fetchEducatorCourses=async()=>{
    setCourses(allCourses)
  }

  useEffect(()=>{
    fetchEducatorCourses()
  },[])

  return courses? (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600 text-left text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">All Courses</th>
                <th className="px-6 py-4">Earnings</th>
                <th className="px-6 py-4">Students</th>
                <th className="px-6 py-4">Published On</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
              {courses.map((course)=>( 
                <tr key={course.id} className="hover:bg-gray-50 transition">
                  <td className="flex items-center gap-4 px-6 py-4">
                    <img src={course.courseThumbnail} alt="" className="w-14 h-14 object-cover rounded-md" />
                    <span className="font-medium">{course.courseThumbnail}</span>
                  </td>
                  <td className="px-6 py-4">
                    {currency}{Math.floor(course.enrolledStudents.length*(course.coursePrice-course.discount*course.coursePrice/100))}
                  </td>
                  <td className="px-6 py-4">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ):<Loading/>
}

export default MyCourses
