import React from 'react';
import { MenuCategory as MenuCategoryType } from '@/types/menu';
import { MenuItem } from './MenuItem';

interface MenuCategoryProps {
  category: MenuCategoryType;
}

export const MenuCategory: React.FC<MenuCategoryProps> = ({ category }) => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 uppercase font-display">
          {category.name}
        </h2>
        <p className="text-gray-600 text-lg">
          {category.description}
        </p>
        <div className="w-24 h-1 bg-primary-500 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {category.items.map((item) => (
          <MenuItem 
            key={item.id} 
            item={item} 
            index={item.id}
          />
        ))}
      </div>
    </div>
  );
}; 