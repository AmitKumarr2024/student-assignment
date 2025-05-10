import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { loginUser, checkUserStatus, setUser } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    if (user) {
      navigate("/"); // If the user is already logged in, redirect to homepage
    } else {
      dispatch(checkUserStatus());
    }
  }, [dispatch, user, navigate]);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((user) => {
        toast.success(`Logged in: ${user.email}`);
        navigate("/"); // Redirect to homepage after successful login
      })
      .catch((err) => toast.error(err));
  };

  const googleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        dispatch(setUser(user));
        toast.success(`Logged in as ${user.email}`);
        navigate("/");
      })
      .catch((error) => {
        console.error(" Google login error:", error);
        toast.error(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md flex flex-col gap-4 justify-center items-center">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Welcome Back!
        </h1>

        <div className="mb-6">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-80 h-9 p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-80 h-9 p-4 border  border-gray-300  focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 text-white rounded-xl ${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-indigo-600 cursor-pointer hover:underline transition duration-300 ease-in-out"
            >
              Sign up
            </span>
          </p>
        </div>
        <br />
        <button
          onClick={googleLogin}
          disabled={loading}
          className="w-full  text-slate-800 bg-slate-200 hover:bg-slate-300 flex justify-center items-center gap-4  py-2 rounded-md  transition duration-300"
        >
          <FcGoogle className="w-6 h-6" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
