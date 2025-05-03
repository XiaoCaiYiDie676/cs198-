import { useState } from 'react';

export default function CategoryFilter({ categories, onFilterChange }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleClick = (category) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="category-filter">
      <button
        className={activeCategory === 'all' ? 'active' : ''}
        onClick={() => handleClick('all')}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          className={activeCategory === category ? 'active' : ''}
          onClick={() => handleClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}