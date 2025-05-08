import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostCard from "./../Components/PostCard";
import Typewriter from "typewriter-effect";
import HeroSection from '../Components/Home/HeroSection';
import FeatureSection from '../Components/Home/FeatureSection';
import Testimonial from '../Components/Home/Testimonial';

const slides = [
  {
    image: 'https://res.cloudinary.com/dgzxzepc8/image/upload/v1745639235/kc7ixymg09bmxm2xlyfi.jpg',
    title: 'Explore Creativity',
    description: 'Unleash your inner poet and share your unique voice'
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/mern-blog-application.appspot.com/o/1723472004662-quran.jpg?alt=media&token=f9006d86-9647-4ae1-b04c-8bbb66721187',
    title: 'Explore Creativity',
    description: 'Unleash your inner poet and share your unique voice'
  }
 
];





const Home = () => {
  const [recentPosts, setRecentPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/post/getposts?limit=6`);
        const data = await res.json();
        
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch recent posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  const RecentBlogsSection = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Typewriter
            options={{
              strings: ["Loading recent blogs...", "Almost there..."],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      );
    }

    return (
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="text-4xl font-bold text-center mb-12">Recent Blogs</h2>
        {recentPosts && recentPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {recentPosts.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="text-center text-gray-500">No recent blogs available</p>
        )}
      </motion.section>
    );
  }, [recentPosts, isLoading]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <HeroSection />
      <FeatureSection />
      {RecentBlogsSection}
      <Testimonial/>
    </div>
  );
};

export default Home;