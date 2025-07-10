import React, { useContext, useState,useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets} from '../../assets/assets'
import Loading from '../../components/students/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = () => {

   
  const {currency,backendUrl,isEducator,getToken}=useContext(AppContext)
  const [dashboardData,setDashboardData]=useState(null)

  const fetchDashboardData=async()=>{
    try {
      const token=await getToken()
      const {data}=await axios.get(backendUrl+'/api/educator/dashboard',
        {headers:{Authorization:`Bearer ${token}`}}
      )

      if(data.success){
        setDashboardData(data.dashboardData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(isEducator){
      fetchDashboardData()
    }
  },[isEducator])

  return dashboardData ? (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
          <img src={assets.patients_icon} alt="" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashboardData.enrolledStudentsData.length}</p>
            <p className="text-gray-500">Total Enrollments</p>
          </div>
        </div>
        <div className="flex items-center bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
          <img src={assets.appointments_icon} alt="" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashboardData.totalCourses}</p>
            <p className="text-gray-500">Total Courses</p>
          </div>
        </div>
        <div className="flex items-center bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
          <img src={assets.earning_icon} alt="" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{currency}{dashboardData.totalEarnings}</p>
            <p className="text-gray-500">Total Earnings</p>
          </div>
        </div>
      </div>
    </div>
  ):<Loading/>
}

export default Dashboard
