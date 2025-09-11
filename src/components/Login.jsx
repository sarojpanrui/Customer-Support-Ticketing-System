import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginImg from "../assets/loginImg.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

      toast.success("Login successful!");

      if (foundUser.role.toLowerCase() === "admin") {
        navigate("/admin");
      } else if (foundUser.role.toLowerCase() === "customer") {
        navigate("/customer");
      }
    } else {
      toast.error("Invalid username or password!");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200 px-4">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl/40 flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">

        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
          <img
            src={loginImg}
            alt="Login illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Welcome Back
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              className="border rounded-xl p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              className="border rounded-xl p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-700 transition flex justify-center align-middle gap-5 text-xl font-bold"
            >
              Login

              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in-icon lucide-log-in"><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /></svg>



            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <a href="/" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
