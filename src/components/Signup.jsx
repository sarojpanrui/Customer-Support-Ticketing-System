// Signup.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-120 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 mb-1 border rounded-2xl ${
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
          className={`w-full p-2 mb-1 border rounded-2xl ${
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
          className={`w-full p-2 mb-1 border rounded-2xl ${
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
          className="w-full p-2 mb-3 border rounded-2xl border-gray-300"
        >
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-2xl hover:bg-blue-600"
        >
          Sign Up
        </button>

        {/* Link to login */}
        <a href="/login" className="text-center">
          Already have an account?{" "}
          <span className="text-blue-600">Login</span>
        </a>
      </form>
    </div>
  );
};

export default Signup;
