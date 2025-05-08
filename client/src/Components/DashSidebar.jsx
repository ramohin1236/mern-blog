import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiUser, 
  HiDocumentText, 
  HiOutlineUserGroup, 
  HiArrowRight 
} from 'react-icons/hi';
import { IoIosCreate } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { FaComments } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 h-full min-h-screen">
      {/* User Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4 mb-8 pb-6 border-b"
      >
        <img 
          src={currentUser.profilePicture} 
          alt="Profile" 
          className="w-16 h-16 rounded-full object-cover 
            border-4 border-teal-500/20"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {currentUser.username}
          </h2>
          <p className="text-sm text-gray-500">
            {currentUser.isAdmin ? 'Admin' : 'User'}
          </p>
        </div>
      </motion.div>

      {/* Sidebar Navigation */}
      <nav className="space-y-2">
        <Link to="/dashboard?tab=profile">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-3 px-4 py-3 
              rounded-xl transition-all group
              ${tab === 'profile' 
                ? 'bg-teal-50 text-teal-600' 
                : 'hover:bg-gray-100 text-gray-700'}`}
          >
            <HiUser className="text-xl text-teal-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Profile</span>
          </motion.div>
        </Link>

        <Link to="/dashboard/create-post">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 px-4 py-3 
              rounded-xl hover:bg-gray-100 text-gray-700 
              transition-all group"
          >
            <IoIosCreate className="text-xl text-green-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Create a Post</span>
          </motion.div>
        </Link>

        <Link to="/dashboard?tab=posts">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-3 px-4 py-3 
              rounded-xl transition-all group
              ${tab === 'posts' 
                ? 'bg-teal-50 text-teal-600' 
                : 'hover:bg-gray-100 text-gray-700'}`}
          >
            <HiDocumentText className="text-xl text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Posts</span>
          </motion.div>
        </Link>

        {/* Admin-only sections */}
        {currentUser.isAdmin && (
          <>
            <Link to="/dashboard?tab=dash">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-3 px-4 py-3 
                  rounded-xl transition-all group
                  ${tab === 'dash' || !tab 
                    ? 'bg-teal-50 text-teal-600' 
                    : 'hover:bg-gray-100 text-gray-700'}`}
              >
                <MdDashboard className="text-xl text-purple-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Dashboard</span>
              </motion.div>
            </Link>

            <Link to="/dashboard?tab=users">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-3 px-4 py-3 
                  rounded-xl transition-all group
                  ${tab === 'users' 
                    ? 'bg-teal-50 text-teal-600' 
                    : 'hover:bg-gray-100 text-gray-700'}`}
              >
                <HiOutlineUserGroup className="text-xl text-indigo-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Users</span>
              </motion.div>
            </Link>

            <Link to="/dashboard?tab=comments">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-3 px-4 py-3 
                  rounded-xl transition-all group
                  ${tab === 'comments' 
                    ? 'bg-teal-50 text-teal-600' 
                    : 'hover:bg-gray-100 text-gray-700'}`}
              >
                <FaComments className="text-xl text-pink-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Comments</span>
              </motion.div>
            </Link>
          </>
        )}

        {/* Signout Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignout}
          className="flex items-center space-x-3 px-4 py-3 
            rounded-xl mt-6 bg-red-50 text-red-600 
            hover:bg-red-100 transition-colors 
            cursor-pointer group"
        >
          <HiArrowRight className="text-xl group-hover:rotate-12 transition-transform" />
          <span className="font-medium">Sign Out</span>
        </motion.div>
      </nav>
    </div>
  );
};

export default DashSidebar;