import { 
    FaFire 
  } from 'react-icons/fa';
  import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Trending() {

    

    const trendingTopics = [
      { name: 'AI Revolution', posts: 42 },
      { name: 'Mental Health', posts: 35 },
      { name: 'Web Development', posts: 53 },
      { name: 'Sustainable Living', posts: 28 },
      { name: 'Personal Finance', posts: 37 },
      { name: 'Machine Learning', posts: 46 }
    ];
  
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">

          <section className="bg-gradient-to-br from-teal-500 to-blue-600 text-white py-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="container mx-auto px-4"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  Trending Topics
                </h2>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Discover what's capturing the imagination of our community
                </p>
              </div>
  
              <div className="grid md:grid-cols-3 gap-6">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 
                    }}
                    className="bg-white/10 p-6 rounded-2xl hover:bg-white/20 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">
                        {topic.name}
                      </h3>
                      <FaFire className="text-orange-400" />
                    </div>
                    <p className="text-white/70 mt-2">
                      {topic.posts} posts this week
                    </p>
                    <Link
                      to='/search'
                      className="mt-4 inline-block text-white/80 hover:text-white transition-colors"
                    >
                      Explore Topic
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
  
        </div>
      </div>
    );
  }