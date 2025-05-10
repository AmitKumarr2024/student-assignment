import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { signupUser, checkUserStatus, setUser } from "../Store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      dispatch(checkUserStatus());
    }
  }, [dispatch, user, navigate]);

  const handleSignup = () => {
    dispatch(signupUser({ email, password }))
      .unwrap()
      .then((user) => {
        toast.success(`Signed up: ${user.email}`);
        navigate("/");
      })
      .catch((err) => toast.error(err));
  };

  const signupWithGoogle = async() => {
   try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(" Google signup success:", user);

   
    dispatch(setUser(user));
  } catch (error) {
    console.error(" Google signup error:", error);
  }

  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
        <br />
        <button
          onClick={signupWithGoogle}
          disabled={loading}
          className="w-full  text-slate-800 bg-slate-200 hover:bg-slate-300 py-2 flex justify-center items-center gap-4 rounded-md  transition duration-300"
        >
        <FcGoogle className="w-6 h-6"/>
          SignUp with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
