import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products = [], columns = 4 }) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center bg-brand-50/50 rounded-2xl border border-dashed border-gray-300">
        <p className="text-gray-500 font-medium">No products found matching your request.</p>
      </div>
    );
  }

  const gridColsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid ${gridColsClass} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
