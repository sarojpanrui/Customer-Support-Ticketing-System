// Signup.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import signup from "../assets/singup.png";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string().oneOf(["Customer", "Admin"]).required(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "Customer",
    },
    validationSchema,
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const existingUser = users.find((u) => u.email === values.email);
      if (existingUser) {
        toast.error("User already exists with this email!");
        return;
      }

      const newUser = { id: Date.now(), ...values };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      toast.success("Signup successful! You can now log in.");
      navigate("/login");
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200 px-4">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl/40 flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        
        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
          <img
            src={signup}
            alt="Signup illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Create Account
          </h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 border rounded-xl ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm">{formik.errors.username}</p>
            )}

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 border rounded-xl ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 border rounded-xl ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}

            {/* Role */}
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border rounded-xl border-gray-300"
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Sign Up
            </button>

            {/* Link to login */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
