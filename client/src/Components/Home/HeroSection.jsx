import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
function HeroSection() {
    return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-screen flex items-center justify-center text-white"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center filter brightness-50"
            style={{ backgroundImage: `url('https://res.cloudinary.com/dgzxzepc8/image/upload/v1745639235/kc7ixymg09bmxm2xlyfi.jpg')` }}
          />
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-10 text-center max-w-3xl px-4"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-shadow">
              Discover, Create, Inspire
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              A platform where writers, poets, and creators come together to share their passion
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-teal-500 text-white 
                  px-6 py-3 rounded-xl hover:bg-teal-600 
                  transition-colors  text-lg font-semibold "
            >
                <Link  to="/dashboard/create-post">  Start Writing</Link>
            
            </motion.button>
          </motion.div>
        </motion.div>
      );
}

export default HeroSection