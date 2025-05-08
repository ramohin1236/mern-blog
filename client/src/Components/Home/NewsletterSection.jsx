import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPaperPlane, 
  FaCheckCircle 
} from 'react-icons/fa';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Reset previous states
    setError('');
    setSubscribed(false);

    // Validate email
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      // Local storage-based subscription simulation
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      
      // Check if email already exists
      if (subscribers.includes(email)) {
        setError('This email is already subscribed');
        return;
      }

      // Add new subscriber
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

      // Simulate successful subscription
      setSubscribed(true);
      setEmail('');

      // Optional: Log subscribers (you can remove this in production)
      console.log('Current Subscribers:', subscribers);
    } catch (error) {
      setError('Subscription failed. Please try again.');
      console.error('Subscription error:', error);
    }
  };

  return (
    <section className="py-16 px-4 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-2xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2 items-center">
          {/* Left Side - Illustration and Text */}
          <div className="p-8 bg-gradient-to-br from-teal-500 to-blue-600 text-white">
            <div className="flex items-center mb-6">
              <FaEnvelope className="text-4xl mr-4" />
              <h2 className="text-3xl font-bold">
                Stay Inspired, Stay Connected
              </h2>
            </div>
            <p className="text-white/80 mb-6">
              Join our community and receive weekly curated content, 
              exclusive insights, and inspiring stories directly in your inbox.
            </p>
            <ul className="space-y-3 mb-6 text-white/90">
              <li className="flex items-center">
                <FaCheckCircle className="mr-3 text-white" />
                Personalized content recommendations
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="mr-3 text-white" />
                No spam, just quality insights
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="mr-3 text-white" />
                Easy unsubscribe anytime
              </li>
            </ul>
          </div>

          {/* Right Side - Subscription Form */}
          <div className="p-8">
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl 
                    focus:ring-2 focus:ring-teal-500 
                    focus:border-transparent transition-all"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <FaPaperPlane className="text-gray-400" />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm"
                >
                  {error}
                </motion.p>
              )}

              {subscribed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-50 border border-green-200 
                    text-green-700 px-4 py-3 rounded-xl 
                    flex items-center"
                >
                  <FaCheckCircle className="mr-3" />
                  Thank you for subscribing!
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full bg-teal-500 text-white 
                  px-6 py-3 rounded-xl hover:bg-teal-600 
                  transition-colors flex items-center 
                  justify-center space-x-3 group"
              >
                <span>Subscribe Now</span>
                <FaPaperPlane className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;