import React from 'react'
import { Navigate } from "react-router-dom";


const LoginProtect = ({children}) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // If user is logged in, redirect them away from login page
    if (loggedInUser) {
        if (loggedInUser.role.toLowerCase() === "admin") {
            return <Navigate to="/admin" />;
        } else {
            return <Navigate to="/customer" />;
        }
    }

    return children; // ot

}

export default LoginProtect
