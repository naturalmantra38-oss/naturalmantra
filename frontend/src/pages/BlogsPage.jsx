import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import { blogService } from '../services/api';
import { MOCK_BLOGS } from '../data/mockData';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState(MOCK_BLOGS);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogService.getBlogs();
        if (res?.blogs) setBlogs(res.blogs);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <SEOHead
        title="Wellness & Organic Living Blog | Natural Mantra"
        description="Read expert articles on cold-pressed oils, high-curcumin turmeric, Ayurvedic remedies, and healthy organic living."
      />

      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-10">
        <Breadcrumb items={[{ label: 'Wellness Blog' }]} />

        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">AYURVEDA & HEALTH</span>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-heading text-brand-700">Natural Mantra Journal</h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Insights, traditional recipes, and wellness guides authored by organic experts and practitioners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <article key={blog._id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between">
              <div className="aspect-video bg-brand-50 overflow-hidden">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <span className="font-bold text-brand-gold uppercase">{blog.category}</span>
                    <span>•</span>
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {new Date(blog.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-xl font-bold font-serif-heading text-brand-700 hover:text-brand-gold transition-colors">
                    <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{blog.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 flex items-center">
                    <User className="w-3.5 h-3.5 mr-1 text-brand-gold" /> {blog.author}
                  </span>
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="text-xs font-bold text-brand-700 hover:text-brand-gold flex items-center space-x-1 uppercase tracking-wider"
                  >
                    <span>READ ARTICLE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
