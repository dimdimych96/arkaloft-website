import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { SEO } from '../components/SEO';

export function TermsOfService() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/terms-of-service.md')
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error('Error loading terms of service:', err));
  }, []);

  return (
    <>
      <SEO
        title="Пользовательское соглашение"
        description="Пользовательское соглашение Arkaloft — правила использования сайта и условия предоставления услуг"
      />

      <div className="min-h-screen bg-gradient-to-br from-secondary-peach/10 via-white to-secondary-yellow/10">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-peach to-secondary-yellow text-white py-16 px-4 pt-32">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-medium">На главную</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <span className="material-symbols-outlined text-3xl">description</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black">Пользовательское соглашение</h1>
              </div>
              <p className="text-white/90 text-lg">
                Правила использования сайта и условия предоставления услуг
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            <div className="prose prose-lg max-w-none
              prose-headings:font-bold
              prose-h1:text-3xl prose-h1:mb-6 prose-h1:text-gray-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-secondary-peach prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-gray-800
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-secondary-peach prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
              prose-li:text-gray-700 prose-li:my-2
              prose-hr:border-gray-200 prose-hr:my-8">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>

            {/* Bottom Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Link
                to="/privacy"
                className="inline-flex items-center gap-2 text-secondary-peach hover:text-secondary-peach/80 transition-colors font-medium"
              >
                <span className="material-symbols-outlined">shield</span>
                <span>Политика конфиденциальности</span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-peach text-white rounded-full font-semibold hover:bg-secondary-peach/90 transition-colors shadow-lg hover:shadow-xl"
              >
                <span className="material-symbols-outlined">mail</span>
                <span>Связаться с нами</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
