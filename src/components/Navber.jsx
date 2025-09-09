import React, { useState, useEffect } from 'react';

const Navber = () => {
  const [name, setName] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      console.log(loggedInUser.username); // "dsa"
      console.log(loggedInUser.role);     // "Customer"
      setName(loggedInUser.username.toUpperCase());
    }
  }, []);

  return (
    <div className="flex justify-center align-middle">
      <div className="border p-3 mt-2 w-[98%] rounded-2xl border-gray-300 shadow-2xl/10">
        <h1 className="text text-center text-3xl font-bold">
          Welcome {name ? name : "Guest"}
        </h1>
      </div>
    </div>
  );
};

export default Navber;
