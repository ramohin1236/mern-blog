import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaSort, 
  FaTags 
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from './../Components/PostCard';
import { useSelector } from 'react-redux';

const Search = () => {
  const { currentUser } = useSelector(state => state.user);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Existing useEffect and other functions remain the same

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        category: categoryFromUrl || 'uncategorized',
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        const data = await res.json();
        
        setPosts(data.posts);
        setShowMore(data.posts.length === 9);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);


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
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', numberOfPosts);
    
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    const data = await res.json();
    
    setPosts([...posts, ...data.posts]);
    setShowMore(data.posts.length === 9);
  };
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl border border-gray-100 mb-8"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Search Input */}
              <div className="relative flex-grow w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search blogs, articles, topics..."
                  value={sidebarData.searchTerm}
                  onChange={(e) => setSidebarData({...sidebarData, searchTerm: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <FaFilter />
                  <span className="hidden md:inline">Filters</span>
                </button>

                <button 
                  type="submit" 
                  onClick={handleSubmit}
                  className="bg-teal-500 text-white px-6 py-3 rounded-xl hover:bg-teal-600 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Expanded Filter Section */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {/* Sort Filter */}
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2 text-gray-600">
                      <FaSort />
                      <span>Sort By</span>
                    </label>
                    <select
                      value={sidebarData.sort}
                      onChange={(e) => setSidebarData({...sidebarData, sort: e.target.value})}
                      className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="desc">Newest First</option>
                      <option value="asc">Oldest First</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2 text-gray-600">
                      <FaTags />
                      <span>Category</span>
                    </label>
                    <select
                      value={sidebarData.category}
                      onChange={(e) => setSidebarData({...sidebarData, category: e.target.value})}
                      className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="uncategorized">All Categories</option>
                      <option value="technology">Technology</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="poetry">Poetry</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Posts Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                repeat: Infinity, 
                duration: 1, 
                ease: "linear" 
              }}
              className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <div>
            {posts.length === 0 ? (
              <div className="text-center text-gray-500 text-2xl py-12">
                No posts found
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {posts.map((post) => (
                    <motion.div
                      key={post._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  ))}
                </div>
                
                {showMore && (
                  <div className="text-center mt-8">
                    <button 
                      onClick={handleShowMore}
                      className="bg-teal-500 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-colors"
                    >
                      Show More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;