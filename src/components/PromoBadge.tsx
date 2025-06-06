import React from 'react';
import { Star, Flame, Tag } from 'lucide-react';

interface PromoBadgeProps {
  type: 'special' | 'popular' | 'new' | 'discount';
  discount?: number;
  className?: string;
}

export const PromoBadge: React.FC<PromoBadgeProps> = ({ type, discount, className = '' }) => {
  const badgeConfig = {
    special: {
      icon: Star,
      text: 'ESPECIAL',
      bgColor: 'bg-yellow-500',
      textColor: 'text-white'
    },
    popular: {
      icon: Flame,
      text: 'MAIS PEDIDO',
      bgColor: 'bg-red-500',
      textColor: 'text-white'
    },
    new: {
      icon: Tag,
      text: 'NOVO',
      bgColor: 'bg-green-500',
      textColor: 'text-white'
    },
    discount: {
      icon: Tag,
      text: discount ? `${discount}% OFF` : 'PROMOÇÃO',
      bgColor: 'bg-primary-600',
      textColor: 'text-white'
    }
  };

  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${config.bgColor} ${config.textColor} ${className}`}>
      <Icon className="w-3 h-3" />
      <span>{config.text}</span>
    </div>
  );
}; 