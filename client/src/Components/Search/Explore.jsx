import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaBook, 
  FaCode, 
  FaPenNib,
} from 'react-icons/fa';
import Trending from './Trending';
import NewsletterSection from '../Home/NewsletterSection';


export default function Explore() {



  const featuredCategories = [
    {
      name: 'Technology',
      icon: FaRocket,
      description: 'Cutting-edge innovations and tech insights',
      color: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      name: 'Lifestyle',
      icon: FaBook,
      description: 'Personal growth and inspiring stories',
      color: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      name: 'Programming',
      icon: FaCode,
      description: 'Coding tutorials and developer resources',
      color: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      name: 'Creative Writing',
      icon: FaPenNib,
      description: 'Explore literary expressions',
      color: 'bg-pink-100',
      textColor: 'text-pink-600'
    }
  ];

 
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        
        {/* Featured Categories Section */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Explore Our Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dive into diverse topics that inspire, educate, and entertain
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 
                }}
                className={`${category.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group`}
              >
                <div className={`${category.textColor} text-4xl mb-4`}>
                  <category.icon />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <Link 
                  to='/search'
                  className={`${category.textColor} font-semibold flex items-center hover:underline`}
                >
                  Explore Category
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending Topics Section */}
       <Trending/>
       <NewsletterSection/>
      </div>
    </div>
  );
}