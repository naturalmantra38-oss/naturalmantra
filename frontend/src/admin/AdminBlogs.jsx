import React, { useState } from 'react';
import { MOCK_BLOGS } from '../data/mockData';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState(MOCK_BLOGS);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-serif-heading text-white">Wellness Blog CMS</h2>
          <p className="text-xs text-gray-400">Publish articles, recipes, and SEO guides.</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-soft">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-800/80 text-gray-300 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Cover</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-200">
            {blogs.map((b) => (
              <tr key={b._id} className="hover:bg-gray-800/40">
                <td className="p-4">
                  <img src={b.coverImage} alt="" className="w-12 h-8 object-cover rounded-lg bg-gray-800" />
                </td>
                <td className="p-4 font-bold text-white max-w-xs truncate">{b.title}</td>
                <td className="p-4 text-brand-gold">{b.category}</td>
                <td className="p-4 text-gray-400">{b.author}</td>
                <td className="p-4">
                  <span className="bg-green-950 text-green-300 px-2 py-0.5 rounded text-[10px] font-bold">
                    Published
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogs;
