'use client';

import { useState } from 'react';

export default function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
          activeCategory === 'all' 
            ? 'bg-[#c9a84c] text-[#0d0a06] border-[#c9a84c]' 
            : 'bg-[#1a1207] text-[#c4a882] border-[#8a7230]/30 hover:border-[#c9a84c]'
        }`}
        onClick={() => onSelectCategory('all')}
      >
        All Entries
      </button>
      
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border flex items-center gap-2 ${
            activeCategory === cat.id 
              ? 'bg-[#c9a84c] text-[#0d0a06] border-[#c9a84c]' 
              : 'bg-[#1a1207] text-[#c4a882] border-[#8a7230]/30 hover:border-[#c9a84c]'
          }`}
          onClick={() => onSelectCategory(cat.id)}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
