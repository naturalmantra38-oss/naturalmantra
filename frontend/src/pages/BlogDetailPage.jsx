import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import { blogService } from '../services/api';
import { MOCK_BLOGS } from '../data/mockData';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await blogService.getBlogBySlug(slug);
        if (res?.blog) setBlog(res.blog);
      } catch (err) {
        console.error('Error fetching blog detail:', err);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        Loading article details...
      </div>
    );
  }

  // Article Schema Markup for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': blog.title,
    'description': blog.excerpt,
    'image': blog.coverImage,
    'author': {
      '@type': 'Person',
      'name': blog.author
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Natural Mantra',
      'logo': {
        '@type': 'ImageObject',
        'url': `${window.location.origin}/assets/natural-mantra-logo.svg`
      }
    },
    'datePublished': blog.publishedAt
  };

  return (
    <>
      <SEOHead
        title={blog.seoTitle || `${blog.title} | Natural Mantra Blog`}
        description={blog.seoDescription || blog.excerpt}
        keywords={blog.seoKeywords || blog.tags?.join(', ')}
        ogImage={blog.coverImage}
        schemaData={articleSchema}
      />

      <article className="max-w-4xl mx-auto px-4 pb-20 space-y-8">
        <Breadcrumb
          items={[
            { label: 'Wellness Blog', link: '/blogs' },
            { label: blog.title }
          ]}
        />

        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
            {blog.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif-heading text-brand-700 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 pt-2">
            <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1 text-brand-gold" /> {blog.author}</span>
            <span>•</span>
            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-brand-gold" /> {new Date(blog.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="aspect-video bg-brand-50 rounded-3xl overflow-hidden shadow-soft border border-gray-100">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* CONTENT BODY */}
        <div className="bg-white p-6 md:p-12 rounded-3xl border border-gray-100 shadow-soft space-y-6 text-sm text-gray-700 leading-relaxed font-sans">
          {blog.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-xl font-bold font-serif-heading text-brand-700 pt-4">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('#### ')) {
              return <h4 key={idx} className="text-lg font-bold font-serif-heading text-brand-700 pt-2">{paragraph.replace('#### ', '')}</h4>;
            }
            return <p key={idx}>{paragraph}</p>;
          })}

          {blog.tags?.length > 0 && (
            <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-500 flex items-center mr-2">
                <Tag className="w-3.5 h-3.5 mr-1" /> Tags:
              </span>
              {blog.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/blogs"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO BLOG JOURNAL</span>
          </Link>
        </div>
      </article>
    </>
  );
};

export default BlogDetailPage;
