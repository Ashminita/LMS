import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { isEducator } = useContext(AppContext)

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];

  return isEducator && (
    <div className="w-full md:w-64 bg-white shadow-md p-4 space-y-4 border border-gray-100 rounded-lg">
  {menuItems.map((item) => (
    <NavLink
      to={item.path}
      key={item.name}
      end={item.path === '/educator'}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[#f1f5ff] ${
          isActive
            ? 'bg-[#e0ecff] text-[#1e40af] font-semibold shadow-sm'
            : 'text-gray-700'
        }`
      }
    >
      <img src={item.icon} alt="" className="w-6 h-6" />
      <p className="md:block hidden text-sm">{item.name}</p>
    </NavLink>
  ))}
</div>

  )
}

export default Sidebar
