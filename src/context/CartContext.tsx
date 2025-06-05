'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem } from '@/types/menu';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  generateWhatsAppMessage: () => string;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        };
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }];
        
        return {
          ...state,
          items: newItems,
          total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0
      };
    
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const generateWhatsAppMessage = () => {
    if (state.items.length === 0) return '';

    let message = '🌮 *PEDIDO - TAPIOCA RECHEADA DE CHAPA*\n\n';
    
    // Agrupar por categoria
    const tapiocas = state.items.filter(item => item.category.includes('tapioca'));
    const bebidas = state.items.filter(item => item.category === 'bebidas');
    
    if (tapiocas.length > 0) {
      message += '🌮 *TAPIOCAS:*\n';
      tapiocas.forEach(item => {
        message += `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
      });
      message += '\n';
    }
    
    if (bebidas.length > 0) {
      message += '🥤 *BEBIDAS:*\n';
      bebidas.forEach(item => {
        message += `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
      });
      message += '\n';
    }
    
    message += `💰 *TOTAL: R$ ${state.total.toFixed(2)}*\n\n`;
    message += '📍 *Endereço para entrega:*\n';
    message += '(Por favor, informe seu endereço completo)\n\n';
    message += '💳 *Forma de pagamento:* PIX\n';
    message += `🔑 *Chave PIX:* 75988475658\n`;
    message += `👤 *Nome:* Silvana dos Santos Silva`;
    
    return encodeURIComponent(message);
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      generateWhatsAppMessage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 