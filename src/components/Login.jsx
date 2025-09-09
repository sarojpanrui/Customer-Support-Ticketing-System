import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();

       const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

        if (foundUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

            if (foundUser.role.toLowerCase() === "admin") {
                navigate("/admin");
                 toast.success("Login successful!");
            } else if (foundUser.role.toLowerCase() === "customer") {
                navigate("/customer");
                 toast.success("Login successful!");
            }
        } else {
            toast.error("Invalid username or password!");
        }
       
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md p-6 rounded-2xl border border-gray-300 shadow-2xl bg-white">
                <h1 className="text-center font-bold text-2xl mb-5">Login</h1>
                <form
                    className="flex flex-col gap-5"
                    onSubmit={handleLogin}
                >
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        className="border rounded-2xl p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="border rounded-2xl p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="border p-2 rounded-2xl bg-blue-500 border-gray-300 text-white font-semibold hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>

                     <a href="/" className="ml-18">Do not have an account ? <span className="text-blue-600">Signup</span></a>
                </form>
            </div>
        </div>
    )
}

export default Login
