import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaRocket, 
  FaBook, 
  FaPenNib, 
  FaChartLine, 
  FaArrowRight 
} from 'react-icons/fa';
import NewsletterSection from './NewsletterSection';
// import RecentBlogsSection from './RecentBlogsSection';


// Assuming you have existing components

const Testimonial = () => {
  const featuredCategories = [
    {
      icon: FaRocket,
      title: 'Technology',
      description: 'Cutting-edge insights and innovations',
      color: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      icon: FaBook,
      title: 'Lifestyle',
      description: 'Inspiring stories and personal growth',
      color: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      icon: FaPenNib,
      title: 'Creative Writing',
      description: 'Explore literary expressions',
      color: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      icon: FaChartLine,
      title: 'Personal Development',
      description: 'Strategies for success and mindset',
      color: 'bg-teal-100',
      textColor: 'text-teal-600'
    }
  ];

  const testimonials = [
    {
      quote: "An incredible platform for knowledge and inspiration!",
      author: "Sarah Johnson",
      role: "Tech Entrepreneur"
    },
    {
      quote: "The content here is both insightful and beautifully written.",
      author: "Michael Chen",
      role: "Creative Director"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Featured Categories Section */}
      <section className="py-16 px-4 container mx-auto">
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
            Dive into a world of diverse content spanning technology, lifestyle, creativity, and personal growth.
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
                {category.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
              <Link 
                to="/search"
                className={`${category.textColor} font-semibold flex items-center hover:underline`}
              >
                Explore <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Posts Section (Existing) */}
      {/* <RecentBlogsSection /> */}

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              What Our Readers Say
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Hear from our community of passionate readers and writers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 
                }}
                className="bg-white/10 p-6 rounded-2xl"
              >
                <p className="text-xl italic mb-4 text-white">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div>
                    <h4 className="font-bold text-white">
                      {testimonial.author}
                    </h4>
                    <p className="text-white/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="bg-gray-100 py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Start Your Reading Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join our community of curious minds and passionate writers. 
            Discover, learn, and share your stories.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="bg-teal-500 text-white px-8 py-3 rounded-xl hover:bg-teal-600 transition-colors"
            >
              Create Account
            </Link>
            <Link
              to="/explore"
              className="border-2 border-teal-500 text-teal-500 px-8 py-3 rounded-xl hover:bg-teal-500 hover:text-white transition-colors"
            >
              Explore Posts
            </Link>
          </div>
        </motion.div>
      </section> */}

      <NewsletterSection/>
    </div>
  );
};

export default Testimonial;