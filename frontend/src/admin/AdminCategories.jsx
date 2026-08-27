import React, { useState } from 'react';
import { MOCK_CATEGORIES } from '../data/mockData';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-serif-heading text-white">Category Management</h2>
          <p className="text-xs text-gray-400">Organize product categories and sort order.</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-soft">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-800/80 text-gray-300 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Category Image</th>
              <th className="p-4">Category Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Sort Order</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-200">
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-800/40">
                <td className="p-4">
                  <img src={cat.image} alt="" className="w-12 h-10 object-cover rounded-lg bg-gray-800" />
                </td>
                <td className="p-4 font-bold text-white">{cat.name}</td>
                <td className="p-4 font-mono text-gray-400">{cat.slug}</td>
                <td className="p-4 font-bold">{cat.sortOrder}</td>
                <td className="p-4">
                  <span className="bg-green-950 text-green-300 px-2 py-0.5 rounded text-[10px] font-bold">
                    Active
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

export default AdminCategories;
