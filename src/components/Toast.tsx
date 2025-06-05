'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  isVisible, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3 animate-slide-in">
      <CheckCircle className="w-5 h-5" />
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Hook para gerenciar toasts
export const useToast = () => {
  const [toast, setToast] = useState<{
    message: string;
    isVisible: boolean;
  }>({
    message: '',
    isVisible: false
  });

  const showToast = (message: string) => {
    setToast({
      message,
      isVisible: true
    });
  };

  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  return {
    toast,
    showToast,
    hideToast
  };
}; 