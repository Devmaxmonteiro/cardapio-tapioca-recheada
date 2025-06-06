'use client';

import React, { useState, useEffect } from 'react';
import { getApplicablePromotions } from '@/data/delivery';
import { Promotion } from '@/types/menu';
import { useCart } from '@/context/CartContext';
import { Gift, Clock, Percent, Truck, X } from 'lucide-react';

export const PromotionBanner: React.FC = () => {
  const { state } = useCart();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [dismissedPromotions, setDismissedPromotions] = useState<string[]>([]);

  useEffect(() => {
    const updatePromotions = () => {
      const applicable = getApplicablePromotions(state.subtotal, state.itemCount);
      const filtered = applicable.filter(promo => !dismissedPromotions.includes(promo.id));
      setPromotions(filtered);
    };

    updatePromotions();
    // Atualizar a cada minuto para promoções baseadas em horário
    const interval = setInterval(updatePromotions, 60000);
    
    return () => clearInterval(interval);
  }, [state.subtotal, state.itemCount, dismissedPromotions]);

  const dismissPromotion = (promoId: string) => {
    setDismissedPromotions(prev => [...prev, promoId]);
  };

  const getPromotionIcon = (type: string) => {
    switch (type) {
      case 'percentage':
        return <Percent className="w-5 h-5" />;
      case 'freeDelivery':
        return <Truck className="w-5 h-5" />;
      case 'fixed':
        return <Gift className="w-5 h-5" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };

  const getPromotionColor = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'freeDelivery':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'fixed':
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
      default:
        return 'bg-gradient-to-r from-orange-500 to-orange-600';
    }
  };

  const formatPromotionText = (promo: Promotion) => {
    if (promo.type === 'percentage') {
      return `${promo.value}% OFF`;
    } else if (promo.type === 'freeDelivery') {
      return 'FRETE GRÁTIS';
    } else if (promo.type === 'fixed') {
      return `R$ ${promo.value.toFixed(2)} OFF`;
    }
    return 'OFERTA ESPECIAL';
  };

  const getTimeRemaining = (promo: Promotion) => {
    if (!promo.conditions?.timeRange) return null;
    
    const now = new Date();
    const endTime = promo.conditions.timeRange.end;
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);
    
    const diffMs = endDate.getTime() - now.getTime();
    if (diffMs <= 0) return null;
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}min`;
    }
    return `${diffMinutes}min`;
  };

  if (promotions.length === 0) return null;

  return (
    <div className="space-y-2 mb-6">
      {promotions.map((promo) => {
        const timeRemaining = getTimeRemaining(promo);
        
        return (
          <div
            key={promo.id}
            className={`${getPromotionColor(promo.type)} text-white p-4 rounded-lg shadow-lg relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-4 -top-4 text-6xl">🎉</div>
              <div className="absolute -left-4 -bottom-4 text-4xl">✨</div>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  {getPromotionIcon(promo.type)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-lg">{formatPromotionText(promo)}</h3>
                    {timeRemaining && (
                      <div className="flex items-center space-x-1 bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">
                        <Clock className="w-3 h-3" />
                        <span>{timeRemaining}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm opacity-90">{promo.description}</p>
                  {promo.minOrderValue && state.subtotal < promo.minOrderValue && (
                    <p className="text-xs mt-1 opacity-75">
                      Faltam R$ {(promo.minOrderValue - state.subtotal).toFixed(2)} para ativar esta promoção
                    </p>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => dismissPromotion(promo.id)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Progress Bar para promoções com valor mínimo */}
            {promo.minOrderValue && (
              <div className="mt-3">
                <div className="bg-white bg-opacity-20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((state.subtotal / promo.minOrderValue) * 100, 100)}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1 opacity-75">
                  <span>R$ {state.subtotal.toFixed(2)}</span>
                  <span>R$ {promo.minOrderValue.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}; 