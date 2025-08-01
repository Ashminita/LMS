import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-[#0E1116]">
  <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00C6FF] to-[#6D5BFF] max-w-3xl mx-auto">
    Start Your Learning Journey with Arambh{" "}
    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6D5BFF] to-[#00C6FF]">
      Learn, Grow, and Succeed at Your Own Pace.
    </span>
    <img
      src={assets.sketch}
      alt="sketch"
      className="md:block hidden absolute -bottom-7 right-0"
    />
  </h1>
  <p className="md:block hidden text-[#B0BEC5] max-w-2xl mx-auto">
    Arambh is a student-focused learning platform that makes it easy to attend
    classes, access study materials, and track your progress. With a simple
    interface and helpful features, Arambh keeps you organized, motivated, and
    on the path to success.
  </p>
  <p className="md:hidden text-[#B0BEC5] max-w-sm mx-auto">
    We bring together world-class instructors to help you achieve your
    professional goals.
  </p>
  <SearchBar />
</div>

  );
};

export default Hero;
