import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-[#0d1b2a] text-white py-6 mt-8">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
    <div className="flex flex-col items-center md:items-start gap-2">
      <img src={assets.logo} alt="" className="w-32" />
      <div className="h-1 w-10 bg-[#007bff] rounded-full"></div>
      <p className="text-sm text-gray-400">© 2025 Arambh. All rights reserved.</p>
    </div>

    <div className="flex gap-4">
      <a href="#" className="hover:scale-110 transition-transform duration-200">
        <img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6" />
      </a>
      <a href="#" className="hover:scale-110 transition-transform duration-200">
        <img src={assets.twitter_icon} alt="Twitter" className="w-6 h-6" />
      </a>
      <a href="#" className="hover:scale-110 transition-transform duration-200">
        <img src={assets.instagram_icon} alt="Instagram" className="w-6 h-6" />
      </a>
    </div>
  </div>
</footer>

  )
}

export default Footer
