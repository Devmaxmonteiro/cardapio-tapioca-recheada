import React from 'react';
import { MenuItem } from './MenuItem';
import { MenuItem as MenuItemType } from '@/types/menu';
import { Flame } from 'lucide-react';

interface FeaturedItemsProps {
  items: MenuItemType[];
}

export const FeaturedItems: React.FC<FeaturedItemsProps> = ({ items }) => {
  const featuredItems = items.filter(item => 
    item.isSpecial || item.isPopular || item.discount
  ).slice(0, 4);

  if (featuredItems.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Flame className="w-6 h-6 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-800">
          Destaques da Casa
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredItems.map((item, index) => (
          <MenuItem 
            key={item.id} 
            item={item} 
            index={index + 1}
          />
        ))}
      </div>
    </section>
  );
}; 