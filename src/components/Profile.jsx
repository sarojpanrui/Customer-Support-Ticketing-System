import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';


const Profile = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem("loggedInUser");
    if (storedAuth) setAuth(JSON.parse(storedAuth));
  }, []);





  const handleLogout = () => {

    Swal.fire({
      title: "Are you sure?",
      text: "You are Logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout"
    }).then((result) => {
      if (result.isConfirmed) {

        localStorage.removeItem("loggedInUser");
        // toast.success("Logout successfully");


        Swal.fire({
          title: "Logout",
          text: "Logout Successfully",
          icon: "success"
        });
        navigate("/login");

      }
    });

  };






  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-xl
        flex flex-col items-center py-8 px-4 transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-72`}
      >
        {/* Avatar */}
        <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600
          text-white font-bold shadow-md h-24 w-24 text-5xl">
          {auth ? auth.username.charAt(0).toUpperCase() : "?"}
        </div>

        {/* Username */}
        <div className="mt-4 text-xl font-bold text-gray-800 text-center montserrat">
          {auth ? auth.username.toUpperCase() : "Guest"}
        </div>

        {/* Email */}
        <div className="mt-1 text-sm text-center break-words px-2 lora">
          {auth ? auth.email : "No Email"}
        </div>

        {/* Divider */}
        <div className="w-full border-t my-6"></div>

        {/* Role */}
        <div className="w-full bg-gray-100 text-center py-2 rounded-lg font-medium shadow-sm">
          {auth ? auth.role : "Unknown User"}
        </div>

        {/* Info Box */}
        <div
          className={`mt-5 w-full rounded-xl p-4 flex items-center gap-3
            ${auth?.role?.toLowerCase() === "admin"
              ? "bg-blue-50 border-l-4 border-blue-400 text-blue-700"
              : "bg-green-50 border-l-4 border-green-400 text-green-700"
            }`}
        >
          {auth?.role?.toLowerCase() === "admin" ? (
            <span className="text-sm text-gray-700">
              Welcome, <strong>{auth?.username || "User"}</strong>! You can view
              the tickets created by users and you have the ability to{" "}
              <strong>update</strong> and <strong>delete</strong> them.
            </span>
          ) : (
            <span className="text-sm text-gray-700">
              Welcome, <strong>{auth?.username || "User"}</strong>! You can
              create your ticket which will be resolved by the admin.
            </span>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-auto py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600
          transition duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <p>Logout</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-log-out"
          >
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
        </button>

        {/* Footer */}
        <p className="mt-4 text-xs text-gray-400 text-center">
          2025 All rights reserved
        </p>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-1 z-50 px-3 py-3 rounded-lg bg-black text-white shadow-lg transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        )}
      </button>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default Profile;