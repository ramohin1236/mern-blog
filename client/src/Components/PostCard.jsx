import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendar, FaTag } from 'react-icons/fa';

const PostCard = ({ post }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        type: "spring", 
        stiffness: 100 
      }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0px 15px 25px rgba(0,0,0,0.1)"
      }}
      className="relative bg-white rounded-2xl overflow-hidden 
        border-2 border-transparent hover:border-teal-500 
        transition-all duration-300 
        transform hover:-translate-y-2 
        shadow-lg hover:shadow-2xl"
    >
      {/* Image container with strict overflow hidden */}
      <div className="relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 z-10"></div>
        
        <div className="overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-56 object-cover 
              transition-transform duration-500 
              group-hover:scale-110"
          />
        </div>
        
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs uppercase tracking-wider">
            {post.category || 'Uncategorized'}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center space-x-2">
            <FaCalendar className="text-teal-500" />
            <span>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short', 
                day: 'numeric', 
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaTag className="text-teal-500" />
            <span className="capitalize">{post.category || 'General'}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 
          line-clamp-2 
          group-hover:text-teal-600 
          transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {post.description || 'No description available'}
        </p>

        <Link 
          to={`/post/${post.slug}`}
          className="group inline-flex items-center 
            text-teal-600 hover:text-teal-800 
            font-semibold 
            transition-colors"
        >
          Read More
          <FaArrowRight 
            className="ml-2 transform transition-transform 
              group-hover:translate-x-1" 
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default PostCard;