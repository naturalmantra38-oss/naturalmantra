import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 py-4">
      <Link to="/" className="hover:text-brand-700 flex items-center transition-colors">
        <Home className="w-4 h-4 mr-1" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          {item.link ? (
            <Link to={item.link} className="hover:text-brand-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-brand-700 truncate max-w-[200px] md:max-w-xs">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
