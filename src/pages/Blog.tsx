import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts, blogCategories } from '../data/blogData';
import type { BlogPost } from '../types/blog';
import { SEO } from '../components/SEO';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <SEO
        title="Блог о детских праздниках | Арка Лофт"
        description="Полезные статьи об организации детских праздников, идеи для мероприятий и советы родителям. Блог Арка Лофт — лофт-пространство в Новосибирске."
        keywords="блог детские праздники, организация праздников советы, идеи детский день рождения, как организовать праздник"
        ogImage="/images/halls/0/halls (1).webp"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Блог Арка Лофт
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Полезные статьи об организации детских праздников, креативные идеи и практические советы
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Все статьи
            </button>
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.slug
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-500 text-lg">
                В этой категории пока нет статей
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const category = blogCategories.find(cat => cat.slug === post.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {category && (
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                {category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.readTime} мин</span>
            </div>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
