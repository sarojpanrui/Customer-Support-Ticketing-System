import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowLeft, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { toast } from "react-toastify";

const Profile = () => {
  const [auth, setAuth] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem("loggedInUser");
    if (storedAuth) setAuth(JSON.parse(storedAuth));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    toast.success('Logout successfully')
    navigate("/login");
  };

  return (
    <div className="merriweather">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden relative top-4 left-4 z-50 px-4 py-4 rounded-lg bg-black text-white shadow-lg hover:bg-blue-600 transition w-[20%] mb-5 flex justify-center align-middle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-xl
          flex flex-col items-center py-8 px-4 transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          ${isCollapsed ? "md:w-50" : "md:w-90"}
        `}
      >
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:block absolute top-4 right-[-12px] bg-gray-100 rounded-full p-1 shadow hover:bg-gray-200 transition"
        >
          {isCollapsed ? (
            <FaArrowRight className="text-xl text-blue-600" />
          ) : (
            <FaArrowLeft className="text-xl text-blue-600" />
          )}
        </button>

        {/* Avatar */}
        <div
          className={`
            flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold shadow-md transition-all
            ${isCollapsed ? "h-12 w-12 text-xl" : "h-24 w-24 text-5xl"}
          `}
        >
          {auth ? auth.username.charAt(0).toUpperCase() : "?"}
        </div>

        {/* Username */}
        {!isCollapsed && (
          <div className="mt-4 text-xl font-bold text-gray-800 text-center merriweather">
            {auth ? auth.username.toUpperCase() : "Guest"}
          </div>
        )}

        {/* Email */}
        {!isCollapsed && (
          <div className="mt-1 text-sm  text-center break-words px-2">
            {auth ? auth.email : "No Email"}
          </div>
        )}

        {/* Divider */}
        <div className="w-full border-t my-6"></div>

        {/* Role */}
        <div
          className={`w-full bg-gray-100 text-center py-2 rounded-lg font-medium  shadow-sm ${isCollapsed ? "text-xs" : ""
            }`}
        >
          {auth ? auth.role : "Unknown User"}
        </div>

        {/* Info Box */}
        <div
          className={`mt-5 w-full rounded-xl p-4 flex items-center gap-3 
    ${auth?.role === "admin" ? "bg-blue-50 border-l-4 border-blue-400 text-blue-700" : "bg-green-50 border-l-4 border-green-400 text-green-700"}
  `}
        >
          {auth?.role === "Admin" ? (
            <>

              <span className="text-sm text-gray-700">
                Welcome, <strong>{auth?.username || "User"}</strong>! You can view the tickets created by users and you have the ability to <strong>update</strong> and <strong>delete</strong> them.
              </span>
            </>
          ) : (
            <>

              <span className="text-sm text-gray-700">
                Welcome, <strong>{auth?.username || "User"}</strong>! You can create your ticket which will be resolved by the admin.
              </span>
            </>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`
            w-full mt-auto py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-200 shadow-md flex items-center justify-center
          `}
        >
          {!isCollapsed ? (
            "Logout"
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /></svg>
          )}
        </button>

        {/* Footer */}
        {!isCollapsed && <p className="mt-4 text-xs text-gray-400 text-center">2025 All rights reserved</p>}
      </div>
    </div>
  );
};

export default Profile;
