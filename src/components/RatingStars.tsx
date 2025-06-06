import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  totalReviews?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  totalReviews, 
  size = 'md',
  showNumber = true,
  className = '' 
}) => {
  const sizeConfig = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeConfig = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeConfig[size]} ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300 fill-gray-300'
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className={`font-medium text-gray-600 ${textSizeConfig[size]}`}>
          {rating.toFixed(1)}
          {totalReviews && (
            <span className="text-gray-400 ml-1">
              ({totalReviews})
            </span>
          )}
        </span>
      )}
    </div>
  );
}; 