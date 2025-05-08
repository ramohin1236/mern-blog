import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, title, value, change, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-white shadow-lg rounded-2xl p-4 sm:p-6 border-l-4 ${color} 
      transform transition-all duration-300 hover:shadow-xl`}
  >
    <div className="flex items-center justify-between">
      <div className="flex-grow">
        <h3 className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xl sm:text-3xl font-bold text-gray-800">{value}</span>
          {change > 0 && (
            <span className="flex items-center text-green-500 text-xs sm:text-sm">
              <HiArrowNarrowUp />
              {change}%
            </span>
          )}
        </div>
      </div>
      <Icon className={`text-2xl sm:text-4xl ${color} opacity-50 ml-2 sm:ml-0`} />
    </div>
  </motion.div>
);

const RecentTable = ({ title, items, columns, linkPath }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 w-full"
  >
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-0">{title}</h2>
      <Link 
        to={linkPath} 
        className="text-teal-600 hover:underline text-sm"
      >
        View All
      </Link>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px]">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map((col, index) => (
              <th 
                key={index} 
                className="p-2 sm:p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr 
              key={index} 
              className="hover:bg-gray-50 transition-colors"
            >
              {Object.values(item).map((value, colIndex) => (
                <td 
                  key={colIndex} 
                  className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600 truncate max-w-[200px]"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

const DashAllInformation = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchUsers();
    fetchPosts();
    fetchComments();
  }, []);

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 bg-gray-50">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-8"
      >
        Dashboard Overview
      </motion.h1>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <StatCard 
          icon={HiOutlineUserGroup}
          title="Total Users"
          value={totalUsers}
          change={lastMonthUsers}
          color="border-blue-500"
        />
        <StatCard 
          icon={HiDocumentText}
          title="Total Posts"
          value={totalPosts}
          change={lastMonthPosts}
          color="border-green-500"
        />
        <StatCard 
          icon={HiAnnotation}
          title="Total Comments"
          value={totalComments}
          change={lastMonthComments}
          color="border-purple-500"
        />
      </div>

      {/* Recent Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <RecentTable 
          title="Recent Users"
          items={users.map(user => ({
            Username: user.username,
            Email: user.email,
            Role: user.isAdmin ? 'Admin' : 'User'
          }))}
          columns={['Username', 'Email', 'Role']}
          linkPath="/dashboard?tab=users"
        />
        <RecentTable 
          title="Recent Posts"
          items={posts.map(post => ({
            Title: post.title,
            Category: post.category,
            Author: post.username
          }))}
          columns={['Title', 'Category', 'Author']}
          linkPath="/dashboard?tab=posts"
        />
      </div>
    </div>
  );
};

export default DashAllInformation;