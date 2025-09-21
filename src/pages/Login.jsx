import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/login/loginSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.login);
  const navigate = useNavigate();

  
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

   useEffect(() => {
    if (user) {
      navigate(`/profile/${user.username}`); 
    }
  }, [user, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center min-h-screen gap-10">
        <div>
          <img src="/images/landing.png" alt="" />
        </div>

        {/* //login section  */}
        <div className="flex justify-center">
          <div className="mt-8 w-100 max-w-[350px] justify-center p-5">
            <div>
              <h2 className="font-dancing-script text-center text-5xl mb-3">
                Instagram
              </h2>
            </div>

            {/* Email field */}
            <div className="relative">
              <input
                className="peer w-full border border-gray-300 rounded px-2 pt-2 pb-1 text-xs mt-2"
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-sm left-2 top-1.5 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-sm"
              >
                Mobile Number or Email
              </label>
            </div>

            {/* Password field */}
            <div className="relative">
              <input
                className="peer w-full border border-gray-300 rounded px-2 pt-2 pb-1 text-xs mt-2"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-sm left-2 top-1.5 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-sm"
              >
                Password
              </label>
            </div>

            {/* Login button */}
            <div className="flex flex-col items-center gap-2">
              <button
                type="submit"
                className="bg-[#1877F2] text-white font-semibold px-20 py-1 mt-3 rounded"
              >
                {status === "loading" ? "Logging in..." : "Log in"}
              </button>
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* If logged in */}
            {user && <p className="text-green-600 mt-2">Welcome {user.full_name}</p>}

            {/* line */}
            <div className="flex items-center my-6 ">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-400 font-bold">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <img
                className="w-4 h-4"
                src="/images/facebook.png"
                alt="Facebook"
              />
              <span className="text-sm font-medium text-blue-500">
                Log in with Facebook
              </span>
            </div>

            <div className="flex justify-center">
              <span className="font-medium mt-4">Forget Password</span>
            </div>
            <div className="flex justify-center mt-10 text-sm">
              <span className="text-gray-600">Don't have an account?</span>
              <Link
                to="/register"
                className="ml-1 font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </form>
  );
}

export default Login;
