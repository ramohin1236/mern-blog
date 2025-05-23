import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaSort, 
  FaTag, 
  FaCalendar 
} from 'react-icons/fa';
import PostCard from '../Components/PostCard';
import Explore from '../Components/Search/Explore';
import Headers from '../Components/Headers';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized'
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const categories = [
    'uncategorized', 'technology', 'lifestyle', 
    'personal development', 'travel', 'programming'
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        category: categoryFromUrl || 'uncategorized'
      });
    }

    fetchPosts();
  }, [location.search]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const searchQuery = new URLSearchParams(location.search).toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      const data = await res.json();
      setPosts(data.posts);
      setShowMore(data.posts.length === 9);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    const data = await res.json();
    setPosts([...posts, ...data.posts]);
    setShowMore(data.posts.length === 9);
  };

  return (
    <div>
      <Headers/>
           <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Discover Inspiring Stories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore a world of knowledge, creativity, and insights across 
            various categories and topics.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6">
            <div className="flex items-center space-x-4">
              {/* Search Input */}
              <div className="flex-grow relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search blogs, topics, and more..."
                  value={sidebarData.searchTerm}
                  onChange={(e) => setSidebarData({
                    ...sidebarData, 
                    searchTerm: e.target.value
                  })}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl 
                    focus:ring-2 focus:ring-teal-500 
                    focus:border-transparent transition-all"
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center space-x-4">
                <motion.button 
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <FaFilter />
                  <span className="hidden md:inline">Filters</span>
                </motion.button>

                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-500 text-white px-6 py-3 rounded-xl 
                    hover:bg-teal-600 transition-colors 
                    flex items-center space-x-2"
                >
                  <FaSearch />
                  <span>Search</span>
                </motion.button>
              </div>
            </div>

            {/* Expanded Filter Section */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 grid md:grid-cols-3 gap-4"
                >
                  {/* Sort Options */}
                  <div>
                    <label className="flex items-center text-gray-700 mb-2">
                      <FaSort className="mr-2 text-teal-500" />
                      Sort By
                    </label>
                    <select
                      value={sidebarData.sort}
                      onChange={(e) => setSidebarData({
                        ...sidebarData, 
                        sort: e.target.value
                      })}
                      className="w-full px-4 py-2 border rounded-xl"
                    >
                      <option value="desc">Newest First</option>
                      <option value="asc">Oldest First</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="flex items-center text-gray-700 mb-2">
                      <FaTag className="mr-2 text-teal-500" />
                      Category
                    </label>
                    <select
                      value={sidebarData.category}
                      onChange={(e) => setSidebarData({
                        ...sidebarData, 
                        category: e.target.value
                      })}
                      className="w-full px-4 py-2 border rounded-xl"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="flex items-center text-gray-700 mb-2">
                      <FaCalendar className="mr-2 text-teal-500" />
                      Date Range
                    </label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 border rounded-xl"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-teal-500"></div>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && posts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center my-12"
          >
            <p className="text-2xl text-gray-600">
              No posts found. Try a different search or filter.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </motion.div>
        )}

        {/* Show More Button */}
        {showMore && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShowMore}
              className="bg-teal-500 text-white px-8 py-3 rounded-xl 
                hover:bg-teal-600 transition-colors"
            >
              Show More Posts
            </motion.button>
          </div>
        )}
      </div>

      <div>
         <Explore/>
      </div>
    </div>
    </div>
    
  );
}