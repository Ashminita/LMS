import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import Footer from '../../components/students/Footer'

const MyEnrollments = () => {

  const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext)
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">My Enrollments</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Course</th>
                <th className="py-3 px-6 text-left">Duration</th>
                <th className="py-3 px-6 text-left">Completed</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {enrolledCourses.map((course, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6 flex items-center gap-4">
                    <img src={course.courseThumbnail} alt="" className="w-16 h-16 object-cover rounded-md shadow-sm" />
                    <div>
                      <p className="font-medium text-gray-800">{course.courseTitle}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-green-600">4/10</span> <span className="text-gray-500">Lectures</span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => navigate('/player/' + course._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 text-sm font-medium"
                    >
                      On Going
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyEnrollments
