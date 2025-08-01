import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/educator/Navbar";
import Sidebar from "../../components/educator/Sidebar";
import { assets } from "../../assets/assets";
import Footer from "../../components/educator/Footer";


const Educator = () => {
  return (
    <div className="min-h-screen bg-[#f5faff] text-[#0c2d57] font-inter">
  <Navbar />
  <div className="flex">
    <Sidebar />
    <div className="flex-1 px-4 py-6 bg-white shadow-inner rounded-tl-3xl min-h-screen">
      <Outlet />
    </div>
  </div>
  <Footer />
</div>

  );
};

export default Educator;
