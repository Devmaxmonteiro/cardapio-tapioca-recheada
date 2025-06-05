import React from 'react';
import Image from 'next/image';
import { MenuItem as MenuItemType } from '@/types/menu';
import { formatPrice } from '@/utils/pdfGenerator';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';
import { Toast, useToast } from './Toast';

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
        <div className="relative h-48 bg-gradient-to-br from-yellow-100 to-yellow-200">
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
              <div className="text-4xl mb-2">🌮</div>
              <p className="text-sm font-medium">Foto em breve</p>
            </div>
            </div>
          )}
          
          {item.isSpecial && (
            <div className="absolute top-2 right-2 bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              ESPECIAL
            </div>
          )}
          
          <div className="absolute top-2 left-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            {index}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 uppercase">
            {item.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 leading-relaxed">
            {item.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {item.ingredients.map((ingredient, idx) => (
              <span
                key={idx}
                className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
              >
                {ingredient}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(item.price)}
            </span>
            
            <button 
              onClick={handleAddToCart}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}; 