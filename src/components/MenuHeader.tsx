import React from 'react';
import { Phone, Instagram } from 'lucide-react';
import { RestaurantInfo } from '@/types/menu';

interface MenuHeaderProps {
  restaurantInfo: RestaurantInfo;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ restaurantInfo }) => {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-8 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="flex space-x-1 text-yellow-300 text-2xl">
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-2 font-display">
          {restaurantInfo.name}
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8 text-lg">
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>{restaurantInfo.phone}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Instagram className="w-5 h-5" />
            <span>{restaurantInfo.instagram}</span>
          </div>
        </div>
        
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
          <h2 className="text-xl font-semibold mb-2">PAGUE COM O PIX</h2>
                          <p className="text-sm">{restaurantInfo.pix}</p>
        </div>
      </div>
    </div>
  );
}; 