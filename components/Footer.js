'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative mt-32 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              CrochetStory
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Collecting beautiful handmade products with love and expertise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Products'].map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-gray-600 hover:text-pink-600 text-sm transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Categories</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {['Home Decor', 'Hair Accessories', 'Gift Articles', 'Others'].map((cat) => (
                <li key={cat} className="hover:text-pink-600 transition-colors duration-300 cursor-pointer">
                  {cat}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>Phone: +91 7265924325</li>
              <li>Email: crochetstory@gmail.com</li>
              <li>Location: Ahmedabad, India</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-200 text-center"
        >
          <p className="text-gray-600 text-sm">
            © 2025 CrochetStory. Made with ❤️ for handmade creations.
          </p>
          <p className="text-gray-600 text-sm mt-1">All prices in ₹.</p>
        </motion.div>
      </div>
    </footer>
  );
}
