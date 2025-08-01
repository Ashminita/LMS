import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } =
    useContext(AppContext);
  const isCourseListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk(); //used clerk auth
  const { user } = useUser(); // used clerk auth

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/educator/update-role",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
  className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b py-4 ${
    isCourseListPage ? "bg-white" : "bg-[#0E1116]"
  }`}
>
  <img
    onClick={() => navigate("/")}
    src={assets.print}
    alt="Logo"
    className="w-28 lg:w-32 cursor-pointer"
  />
  <div className="hidden md:flex items-center gap-5 text-[#80D8FF]">
    <div className="flex items-center gap-5">
      {user && (
        <>
          <button
            onClick={becomeEducator}
            className="hover:text-[#00C6FF] transition duration-300"
          >
            {isEducator ? "Educator Dashboard" : "Become Educator"}
          </button>
          <span className="text-gray-400">|</span>
          <Link
            to="my-enrollments"
            className="hover:text-[#00C6FF] transition duration-300"
          >
            My enrollments
          </Link>
        </>
      )}
    </div>
    {user ? (
      <UserButton />
    ) : (
      <button
        onClick={() => openSignIn()}
        className="bg-gradient-to-r from-[#00C6FF] to-[#6D5BFF] text-white px-5 py-2 rounded-full shadow-md hover:opacity-90 transition duration-300"
      >
        Create Account
      </button>
    )}
  </div>

  {/* For Phone View */}
  <div className="md:hidden flex items-center gap-2 sm:gap-5 text-[#80D8FF]">
    <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
      {user && (
        <>
          <button
            onClick={becomeEducator}
            className="hover:text-[#00C6FF] transition duration-300"
          >
            {isEducator ? "Educator Dashboard" : "Become Educator"}
          </button>
          <span className="text-gray-400">|</span>
          <Link
            to="my-enrollments"
            className="hover:text-[#00C6FF] transition duration-300"
          >
            My enrollments
          </Link>
        </>
      )}
    </div>
    {user ? (
      <UserButton />
    ) : (
      <button onClick={() => openSignIn()}>
        <img src={assets.user_icon} alt="user" className="w-6 h-6" />
      </button>
    )}
  </div>
</div>

  );
};

export default Navbar;
