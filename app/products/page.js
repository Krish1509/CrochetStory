'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTextReveal } from '../../hooks/useTextReveal';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';

const categories = [
  { id: 'Home Decor', icon: '🏠', description: 'Beautiful handcrafted items to decorate your home.' },
  { id: 'Hair Accessories', icon: '🎀', description: 'Stylish accessories to complement your hairstyle.' },
  { id: 'Gift Articles', icon: '🎁', description: 'Perfect gifts made with love for your loved ones.' },
  { id: 'Others', icon: '✨', description: 'Unique handcrafted items for every occasion.' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const titleRef = useTextReveal({ stagger: 0.02 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Navbar />

      <main className="flex-grow pt-20">
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-bold text-center text-gray-800 mb-6"
            >
              Explore Our Creations
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl text-gray-600 text-center mb-20 max-w-2xl mx-auto"
            >
              Discover some of our most loved handcrafted creations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-24"
            >
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
                Select a Category
              </h2>
              <p className="text-gray-600 text-center mb-12">
                Explore our handcrafted crochet collections, tailored for every style and occasion.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, y: 50, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.05, rotate: 3, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    className={`relative p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center overflow-hidden group ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-br from-pink-600 to-purple-600 text-white shadow-xl'
                        : 'bg-white text-gray-800 hover:bg-gradient-to-br hover:from-pink-50 hover:to-purple-50 border border-gray-100'
                    }`}
                  >
                    <motion.div
                      className="text-6xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">{category.id}</h3>
                    <p className={`text-sm ${selectedCategory === category.id ? 'text-pink-50' : 'text-gray-600'}`}>
                      {category.description}
                    </p>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h2 className="text-4xl font-semibold text-gray-800 mb-12 text-center">
                {selectedCategory ? `${selectedCategory} Products` : 'Featured Products'}
              </h2>

              {loading ? (
                <div className="text-center py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full mx-auto"
                  />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 glass rounded-3xl p-12 max-w-md mx-auto">
                  <p className="text-gray-600 text-xl">
                    {selectedCategory ? `No products found in ${selectedCategory}.` : 'No products available yet.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
