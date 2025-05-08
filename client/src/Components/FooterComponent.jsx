import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaGithub 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const FooterComponent = () => {
  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Categories', path: '/categories' },
        { name: 'About', path: '/about' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Latest Posts', path: '/posts' },
        { name: 'Tutorials', path: '/tutorials' },
        { name: 'Community', path: '/community' },
        { name: 'Newsletter', path: '/newsletter' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { name: 'Contact', path: '/contact' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'FAQ', path: '/faq' }
      ]
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, url: 'https://facebook.com' },
    { icon: FaTwitter, url: 'https://twitter.com' },
    { icon: FaInstagram, url: 'https://instagram.com' },
    { icon: FaLinkedin, url: 'https://linkedin.com' },
    { icon: FaGithub, url: 'https://github.com' }
  ];

  return (
    <footer className="bg-white py-16 border-t">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link 
              to='/' 
              className="inline-block mb-6"
            >
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-teal-500 to-blue-600 text-transparent bg-clip-text">
                  Mohin's
                </span> Blog
              </span>
            </Link>
            <p className="text-gray-600 mb-6">
              Inspiring stories, tech insights, and creative explorations 
              to fuel your curiosity and growth.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 hover:text-teal-500 transition-colors"
                >
                  <social.icon className="text-2xl" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.path} 
                      className="text-gray-600 hover:text-teal-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Mohin's Blog. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;