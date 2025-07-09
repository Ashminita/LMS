import React from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const educator = dummyEducatorData
  const { user } = useUser()

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
      </Link>
      <div className="flex items-center gap-4">
        <p className="text-gray-700 font-medium text-sm">
          Hi! {user ? user.fullName : 'Developers'}
        </p>
        {user ? (
          <UserButton />
        ) : (
          <img className="w-8 h-8 rounded-full object-cover" src={assets.profile_img} alt="Profile" />
        )}
      </div>
    </div>
  )
}

export default Navbar
