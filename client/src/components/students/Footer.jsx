import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-[#0E1116] md:px-36 text-left w-full mt-10">
  <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-[#2F3C4C]">
    <div className="flex flex-col md:items-start items-center w-full">
      <img src={assets.print} alt="logo" className="w-28" />
      <p className="mt-6 text-center md:text-left text-sm text-[#B0BEC5]">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
        placeat ex repellendus esse commodi impedit ab quaerat laboriosam,
        incidunt nemo! Quia non vero perspiciatis error voluptatibus molestiae
        magnam eos animi!
      </p>
    </div>

    <div className="flex flex-col md:items-start items-center w-full">
      <h2 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00C6FF] to-[#6D5BFF] mb-5">
        Company
      </h2>
      <ul className="flex md:flex-col w-full justify-between text-sm text-[#90A4AE] md:space-y-2">
        <li>
          <a href="#" className="hover:text-[#00C6FF] transition duration-300">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-[#00C6FF] transition duration-300">
            About Us
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-[#00C6FF] transition duration-300">
            Contact Us
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-[#00C6FF] transition duration-300">
            Privacy Policy
          </a>
        </li>
      </ul>
    </div>

    <div className="hidden md:flex flex-col items-start w-full">
      <h2 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6D5BFF] to-[#00C6FF] mb-5">
        Subscribe to our newsletter
      </h2>
      <p className="text-sm text-[#B0BEC5]">
        The latest news, articles, and resources, sent to your inbox weekly.
      </p>
      <div className="flex items-center gap-2 pt-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-[#3C4F66] bg-[#1A1D23] text-[#90A4AE] placeholder-[#90A4AE] outline-none w-64 h-9 rounded px-2 text-sm"
        />
        <button className="bg-gradient-to-r from-[#00C6FF] to-[#6D5BFF] w-24 h-9 text-white rounded hover:opacity-90 transition duration-300">
          Subscribe
        </button>
      </div>
    </div>
  </div>
  <p className="py-4 text-center text-xs md:text-sm text-[#607D8B]">
    © 2025 Arambh. All rights reserved.
  </p>
</footer>

  )
}

export default Footer