import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="flex items-center gap-4 border rounded-2xl p-6 w-full max-w-sm shadow-md bg-white hover:shadow-lg hover:scale-105 transition-transform duration-300 mx-auto">
      {/*   logo */}
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl font-bold shadow-sm">
        {user?.username?.charAt(0).toUpperCase() || "?"}
      </div>

      {/* Info */}
      <div className="flex flex-col overflow-hidden">
        <p className="font-semibold text-gray-800 text-lg truncate">{user?.username}</p>
        <p className="text-sm text-gray-600">Role: {user?.role || "N/A"}</p>
        <p className="text-xs text-gray-500">ID: {user?.id || "—"}</p>
      </div>
    </div>
  );
};

export default UserCard;
