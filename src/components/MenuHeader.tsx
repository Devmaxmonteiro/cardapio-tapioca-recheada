import React from 'react';
import { Phone, Instagram } from 'lucide-react';
import { RestaurantInfo } from '@/types/menu';
import Image from 'next/image';

interface MenuHeaderProps {
  restaurantInfo: RestaurantInfo;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ restaurantInfo }) => {
  const timestamp = Date.now() + Math.random();
  
  return (
    <div className="text-white">
      {/* Logo Section - Full Width */}
      <div className="w-full">
        <Image
          src={`/images/tapioca-logo-amarelo.svg?cache=${timestamp}`}
          alt="Logo Tapioca Recheada de Chapa"
          width={800}
          height={400}
          className="w-full h-auto"
          priority
          unoptimized
        />
      </div>

      {/* Restaurant Info Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-4 sm:p-6 lg:p-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="flex space-x-1 text-yellow-300 text-lg sm:text-xl lg:text-2xl">
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 font-display leading-tight">
            {restaurantInfo.name}
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-8 text-sm sm:text-base lg:text-lg">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{restaurantInfo.phone}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{restaurantInfo.instagram}</span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 inline-block">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">PAGUE COM O PIX</h2>
            <p className="text-xs sm:text-sm break-all">{restaurantInfo.pix}</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 