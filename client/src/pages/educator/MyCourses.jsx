import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/students/Loading'
import axios from 'axios'

const MyCourses = () => {
  
  const {currency,backendUrl,isEducator,getToken}=useContext(AppContext)

  const [courses,setCourses]=useState(null)

  const fetchEducatorCourses=async()=>{
    try {
      const token=await getToken()
      const {data}=await axios.get(backendUrl+'/api/educator/courses',
        {headers:{Authorization:`Bearer ${token}`}}
      )

        data.success && setCourses(data.courses)
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(isEducator){
      fetchEducatorCourses()
    }
  },[isEducator])

  return courses? (
    <div className="p-4 md:p-8 bg-[#f5faff] min-h-screen">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-2xl font-bold text-[#0c2d57] mb-6">My Courses</h2>
    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-[#d6e6ff]">
      <table className="min-w-full divide-y divide-[#dce7f5]">
        <thead className="bg-[#eaf3ff] text-[#28529e] text-left text-sm uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">All Courses</th>
            <th className="px-6 py-4">Earnings</th>
            <th className="px-6 py-4">Students</th>
            <th className="px-6 py-4">Published On</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#edf2f9] text-[#1c2d47]">
          {courses.map((course) => (
            <tr
              key={course.id}
              className="hover:bg-[#f0f7ff] transition duration-200"
            >
              <td className="flex items-center gap-4 px-6 py-4">
                <img
                  src={course.courseThumbnail}
                  alt=""
                  className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                />
                <span className="font-medium text-[#0c2d57]">{course.courseThumbnail}</span>
              </td>
              <td className="px-6 py-4 text-[#1c2d47]">
                {currency}
                {Math.floor(
                  course.enrolledStudents.length *
                    (course.coursePrice -
                      (course.discount * course.coursePrice) / 100)
                )}
              </td>
              <td className="px-6 py-4 text-[#1c2d47]">
                {course.enrolledStudents.length}
              </td>
              <td className="px-6 py-4 text-[#1c2d47]">
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
