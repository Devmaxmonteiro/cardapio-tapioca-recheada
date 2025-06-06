import React from 'react';
import Image from 'next/image';
import { MenuItem as MenuItemType } from '@/types/menu';
import { formatPrice } from '@/utils/pdfGenerator';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';
import { Toast, useToast } from './Toast';
import { PromoBadge } from './PromoBadge';
import { RatingStars } from './RatingStars';
import { Clock } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
  index: number;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, index }) => {
  const { addItem } = useCart();
  const { toast, showToast, hideToast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category
    });
    showToast(`${item.name} adicionado ao carrinho!`);
  };

    return (
    <>
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="relative h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-yellow-100 to-yellow-200">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback para imagem padrão se a imagem não carregar
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-yellow-700">
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">🌮</div>
                <p className="text-xs sm:text-sm font-medium">Foto em breve</p>
              </div>
            </div>
          )}
          
          {/* Badges promocionais */}
          <div className="absolute top-2 right-2 flex flex-col space-y-1">
            {item.isSpecial && (
              <PromoBadge type="special" />
            )}
            {item.isPopular && (
              <PromoBadge type="popular" />
            )}
            {item.isNew && (
              <PromoBadge type="new" />
            )}
            {item.discount && (
              <PromoBadge type="discount" discount={item.discount} />
            )}
          </div>
          
          <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-primary-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
            {index}
          </div>
        </div>
        
        <div className="p-3 sm:p-4">
          <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 uppercase leading-tight">
            {item.name}
          </h3>
          
          <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
            {item.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
            {item.ingredients.slice(0, 3).map((ingredient, idx) => (
              <span
                key={idx}
                className="bg-primary-100 text-primary-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium"
              >
                {ingredient}
              </span>
            ))}
            {item.ingredients.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                +{item.ingredients.length - 3}
              </span>
            )}
          </div>
          
          {/* Rating e tempo de preparo */}
          <div className="flex items-center justify-between mb-3">
            {item.rating && (
              <RatingStars 
                rating={item.rating} 
                totalReviews={item.totalReviews}
                size="sm"
              />
            )}
            {item.preparationTime && (
              <div className="flex items-center space-x-1 text-gray-500 text-xs">
                <Clock className="w-3 h-3" />
                <span>{item.preparationTime} min</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              {item.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(item.originalPrice)}
                </span>
              )}
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-600">
                {formatPrice(item.price)}
              </span>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="bg-primary-600 hover:bg-primary-700 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Adicionar</span>
              <span className="sm:hidden">+</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}; 