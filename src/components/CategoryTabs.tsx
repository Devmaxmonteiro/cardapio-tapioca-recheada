'use client';

import { useState } from 'react';
import { categories } from '@/data/menu';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200 mb-6">
      <div className="w-full px-2 sm:px-4">
        <div className="flex overflow-x-auto scrollbar-hide py-3 gap-1 sm:gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full whitespace-nowrap text-xs sm:text-sm font-medium transition-all flex-shrink-0 min-w-fit
                ${activeCategory === category.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <span className="text-sm sm:text-lg">{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden text-xs">{category.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 