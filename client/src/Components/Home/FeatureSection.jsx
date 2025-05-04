import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
const FeatureSection = () => {
    const features = [
        {
          icon: '✍️',
          title: 'Unlimited Creativity',
          description: 'Express yourself without boundaries'
        },
        {
          icon: '🌐',
          title: 'Global Reach',
          description: 'Connect with readers worldwide'
        },
        {
          icon: '💡',
          title: 'Inspiration Hub',
          description: 'Find motivation from diverse voices'
        }
      ];
      return (
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto py-16 px-4"
        >
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-lg rounded-lg p-6 text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      );
}

export default FeatureSection