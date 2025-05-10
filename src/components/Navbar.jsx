import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logoutUser } from '../Store/authSlice';
import { useState } from 'react';
import { SlLogout } from "react-icons/sl";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
console.log("xxx",user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success('Logged out successfully');
        navigate('/login');
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-xl">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={'/'} className="text-3xl font-bold text-white cursor-pointer hover:text-gray-200 transition duration-300">
          StudentPoint
        </Link>

        {/* Hamburger Icon for Small Screens */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Profile Section for Large Screens */}
        <div className="hidden lg:flex items-center space-x-6">
          {user ? (
            <>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-14 h-14 rounded-full border-4 border-white" />
              ) : (
                <div className="w-14 h-14 rounded-full border-4 border-white bg-indigo-700 text-white flex items-center justify-center text-xl font-bold uppercase">
                  {user.name?.charAt(0) || 'U'}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex justify-center items-center gap-4 bg-red-200 text-slate-800 px-6 py-2 rounded-lg hover:bg-red-300 focus:outline-none transition duration-300"
              >
                <SlLogout />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 bg-gray-800 p-4 rounded-lg`}>
        <div className="flex justify-between items-center mb-4">
          {user ? (
            <>
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-12 h-12 rounded-full border-2 border-white" />
              ) : (
                <div className="w-12 h-12 rounded-full border-2 border-white bg-indigo-700 text-white flex items-center justify-center text-lg font-bold uppercase">
                  {user.name?.charAt(0) || 'U'}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 focus:outline-none transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
