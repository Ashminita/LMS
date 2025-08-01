import React from "react";
import { assets } from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0 bg-[#0E1116] text-center">
  <h1 className="text-xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00C6FF] to-[#6D5BFF]">
    Learn anything, anytime, anywhere
  </h1>
  <p className="text-[#B0BEC5] sm:text-sm max-w-xl">
    Arambh is your smart learning companion — making it easy to attend
    classes, track progress, and stay ahead, all in one place.
  </p>
  <div className="flex items-center font-medium gap-6 mt-4 flex-wrap justify-center">
    <button className="px-10 py-3 rounded-md bg-gradient-to-r from-[#00C6FF] to-[#6D5BFF] text-white shadow-md hover:opacity-90 transition duration-300">
      Get Started
    </button>
    <button className="flex items-center gap-2 text-[#80D8FF] hover:text-[#00C6FF] transition duration-300">
      Learn more <img src={assets.arrow_icon} alt="arrow_icon" className="w-4 h-4" />
    </button>
  </div>
</div>

  );
};

export default CallToAction;
