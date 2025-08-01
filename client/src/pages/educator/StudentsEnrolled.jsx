import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../../components/students/Loading'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
const StudentsEnrolled = () => {

  const {backendUrl,getToken,isEducator}=useContext(AppContext)
  
  const [enrolledStudents,setEnrolledStudents]=useState(null)
  const fetchEnrolledStudents=async()=>{
    try {
      const token=await getToken()
      const {data}=await axios.get(backendUrl + '/api/educator/enrolled-students',{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        setEnrolledStudents(data.enrolledStudents.reverse())
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(isEducator){
      fetchEnrolledStudents()
    }
    
  },[isEducator])

  return enrolledStudents ? (
    <div className="p-4 md:p-8 bg-[#f5faff] min-h-screen">
  <div className="max-w-6xl mx-auto">
    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-[#d6e6ff]">
      <table className="min-w-full divide-y divide-[#dce7f5]">
        <thead className="bg-[#eaf3ff] text-[#28529e] text-left text-sm uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Student Name</th>
            <th className="px-6 py-4">Course Title</th>
            <th className="px-6 py-4">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#edf2f9] text-[#1c2d47]">
          {enrolledStudents.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-[#f0f7ff] transition duration-200"
            >
              <td className="px-6 py-4 font-medium text-[#0c2d57]">
                {index + 1}
              </td>
              <td className="flex items-center gap-3 px-6 py-4">
                <img
                  src={item.student.imageUrl}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <span className="text-[#1c2d47]">{item.student.name}</span>
              </td>
              <td className="px-6 py-4">{item.courseTitle}</td>
              <td className="px-6 py-4">
                {new Date(item.purchaseDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  ) : <Loading/>
}

export default StudentsEnrolled
