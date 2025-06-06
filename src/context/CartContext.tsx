'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, CustomerData, PaymentMethod, DeliveryInfo, Order, Promotion } from '@/types/menu';
import { calculateDeliveryFee, getApplicablePromotions } from '@/data/delivery';

interface CartState {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  customer: CustomerData | null;
  payment: PaymentMethod | null;
  delivery: DeliveryInfo | null;
  appliedPromotions: Promotion[];
  discount: number;
  deliveryFee: number;
  total: number;
  currentStep: 'cart' | 'customer' | 'payment' | 'confirmation' | 'tracking';
}

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updateItemObservations: (id: number, observations: string) => void;
  clearCart: () => void;
  setCustomerData: (customer: CustomerData) => void;
  setPaymentMethod: (payment: PaymentMethod) => void;
  calculateDelivery: (neighborhood: string) => boolean;
  applyPromotions: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: CartState['currentStep']) => void;
  createOrder: () => Order;
  generateWhatsAppMessage: () => string;
  generateDetailedWhatsAppMessage: () => string;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'UPDATE_OBSERVATIONS'; payload: { id: number; observations: string } }
  | { type: 'SET_CUSTOMER'; payload: CustomerData }
  | { type: 'SET_PAYMENT'; payload: PaymentMethod }
  | { type: 'SET_DELIVERY'; payload: DeliveryInfo }
  | { type: 'SET_PROMOTIONS'; payload: { promotions: Promotion[]; discount: number } }
  | { type: 'SET_STEP'; payload: CartState['currentStep'] }
  | { type: 'RECALCULATE_TOTALS' }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Partial<CartState> };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: newItems,
        subtotal,
        itemCount,
        total: subtotal + state.deliveryFee - state.discount
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: newItems,
        subtotal,
        itemCount,
        total: subtotal + state.deliveryFee - state.discount
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id });
      }
      
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: newItems,
        subtotal,
        itemCount,
        total: subtotal + state.deliveryFee - state.discount
      };
    }

    case 'UPDATE_OBSERVATIONS': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, observations: action.payload.observations }
          : item
      );
      
      return {
        ...state,
        items: newItems
      };
    }
    
    case 'SET_CUSTOMER':
      return {
        ...state,
        customer: action.payload
      };

    case 'SET_PAYMENT':
      return {
        ...state,
        payment: action.payload
      };

    case 'SET_DELIVERY':
      return {
        ...state,
        delivery: action.payload,
        deliveryFee: action.payload.fee,
        total: state.subtotal + action.payload.fee
      };

    case 'SET_PROMOTIONS':
      return {
        ...state,
        appliedPromotions: action.payload.promotions,
        discount: action.payload.discount,
        total: state.subtotal + state.deliveryFee - action.payload.discount
      };

    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload
      };

    case 'RECALCULATE_TOTALS':
      return {
        ...state,
        total: state.subtotal + state.deliveryFee - state.discount
      };
    
    case 'CLEAR_CART':
      return {
        ...initialState
      };

    case 'LOAD_CART':
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  subtotal: 0,
  itemCount: 0,
  customer: null,
  payment: null,
  delivery: null,
  appliedPromotions: [],
  discount: 0,
  deliveryFee: 0,
  total: 0,
  currentStep: 'cart'
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persistir carrinho no localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('tapioca-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tapioca-cart', JSON.stringify(state));
  }, [state]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const updateItemObservations = (id: number, observations: string) => {
    dispatch({ type: 'UPDATE_OBSERVATIONS', payload: { id, observations } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('tapioca-cart');
  };

  const setCustomerData = (customer: CustomerData) => {
    dispatch({ type: 'SET_CUSTOMER', payload: customer });
  };

  const setPaymentMethod = (payment: PaymentMethod) => {
    dispatch({ type: 'SET_PAYMENT', payload: payment });
  };

  const calculateDelivery = (neighborhood: string): boolean => {
    const zone = calculateDeliveryFee(neighborhood);
    if (zone) {
      dispatch({ 
        type: 'SET_DELIVERY', 
        payload: {
          fee: zone.fee,
          estimatedTime: zone.estimatedTime,
          zone: zone.name
        }
      });
      return true;
    }
    return false;
  };

  const applyPromotions = () => {
    const applicablePromotions = getApplicablePromotions(state.subtotal, state.itemCount);
    let totalDiscount = 0;

    applicablePromotions.forEach(promo => {
      if (promo.type === 'percentage') {
        totalDiscount += (state.subtotal * promo.value) / 100;
      } else if (promo.type === 'fixed') {
        totalDiscount += promo.value;
      } else if (promo.type === 'freeDelivery') {
        totalDiscount += state.deliveryFee;
      }
    });

    dispatch({ 
      type: 'SET_PROMOTIONS', 
      payload: { 
        promotions: applicablePromotions, 
        discount: totalDiscount 
      } 
    });
  };

  const nextStep = () => {
    const steps: CartState['currentStep'][] = ['cart', 'customer', 'payment', 'confirmation', 'tracking'];
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex < steps.length - 1) {
      dispatch({ type: 'SET_STEP', payload: steps[currentIndex + 1] });
    }
  };

  const previousStep = () => {
    const steps: CartState['currentStep'][] = ['cart', 'customer', 'payment', 'confirmation', 'tracking'];
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex > 0) {
      dispatch({ type: 'SET_STEP', payload: steps[currentIndex - 1] });
    }
  };

  const goToStep = (step: CartState['currentStep']) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const createOrder = (): Order => {
    if (!state.customer || !state.payment || !state.delivery) {
      throw new Error('Dados incompletos para criar pedido');
    }

    return {
      id: `ORDER-${Date.now()}`,
      items: state.items,
      customer: state.customer,
      payment: state.payment,
      delivery: state.delivery,
      subtotal: state.subtotal,
      deliveryFee: state.deliveryFee,
      total: state.total,
      status: {
        current: 'pending',
        history: [{
          status: 'pending',
          timestamp: new Date(),
          message: 'Pedido criado'
        }]
      },
      createdAt: new Date()
    };
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
        if (item.observations) {
          message += `   📝 ${item.observations}\n`;
        }
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
    
    message += `💰 *SUBTOTAL: R$ ${state.subtotal.toFixed(2)}*\n`;
    
    if (state.deliveryFee > 0) {
      message += `🚚 *TAXA DE ENTREGA: R$ ${state.deliveryFee.toFixed(2)}*\n`;
    }
    
    if (state.discount > 0) {
      message += `🎉 *DESCONTO: -R$ ${state.discount.toFixed(2)}*\n`;
    }
    
    message += `💰 *TOTAL: R$ ${state.total.toFixed(2)}*\n\n`;
    message += '📍 *Endereço para entrega:*\n';
    message += '(Por favor, informe seu endereço completo)\n\n';
    message += '💳 *Forma de pagamento:* PIX\n';
    message += `🔑 *Chave PIX:* 75988475658\n`;
    message += `👤 *Nome:* Silvana dos Santos Silva`;
    
    return encodeURIComponent(message);
  };

  const generateDetailedWhatsAppMessage = (): string => {
    if (!state.customer || !state.payment || state.items.length === 0) return '';

    let message = '🌮 *PEDIDO COMPLETO - TAPIOCA RECHEADA DE CHAPA*\n\n';
    
    // Dados do cliente
    message += '👤 *DADOS DO CLIENTE:*\n';
    message += `Nome: ${state.customer.name}\n`;
    message += `Telefone: ${state.customer.phone}\n`;
    if (state.customer.email) {
      message += `Email: ${state.customer.email}\n`;
    }
    message += '\n';

    // Endereço
    message += '📍 *ENDEREÇO DE ENTREGA:*\n';
    message += `${state.customer.address.street}, ${state.customer.address.number}\n`;
    if (state.customer.address.complement) {
      message += `${state.customer.address.complement}\n`;
    }
    message += `${state.customer.address.neighborhood}, ${state.customer.address.city}\n`;
    message += `CEP: ${state.customer.address.zipCode}\n`;
    if (state.customer.address.reference) {
      message += `Referência: ${state.customer.address.reference}\n`;
    }
    message += '\n';

    // Items do pedido
    message += '🛒 *ITEMS DO PEDIDO:*\n';
    state.items.forEach(item => {
      message += `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
      if (item.observations) {
        message += `   📝 ${item.observations}\n`;
      }
    });
    message += '\n';

    // Resumo financeiro
    message += '💰 *RESUMO FINANCEIRO:*\n';
    message += `Subtotal: R$ ${state.subtotal.toFixed(2)}\n`;
    if (state.deliveryFee > 0) {
      message += `Taxa de entrega: R$ ${state.deliveryFee.toFixed(2)}\n`;
    }
    if (state.discount > 0) {
      message += `Desconto: -R$ ${state.discount.toFixed(2)}\n`;
    }
    message += `*TOTAL: R$ ${state.total.toFixed(2)}*\n\n`;

    // Forma de pagamento
    message += '💳 *FORMA DE PAGAMENTO:*\n';
    if (state.payment.type === 'pix') {
      message += 'PIX\n';
      message += `🔑 Chave PIX: 75988475658\n`;
      message += `👤 Nome: Silvana dos Santos Silva\n`;
    } else if (state.payment.type === 'money') {
      message += 'Dinheiro\n';
      if (state.payment.needsChange && state.payment.changeAmount) {
        message += `💵 Precisa de troco para: R$ ${state.payment.changeAmount.toFixed(2)}\n`;
      }
    } else if (state.payment.type === 'card') {
      message += `Cartão ${state.payment.cardType === 'credit' ? 'de Crédito' : 'de Débito'}\n`;
    }

    if (state.delivery) {
      message += `\n⏰ *Tempo estimado de entrega: ${state.delivery.estimatedTime} minutos*`;
    }

    return encodeURIComponent(message);
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      updateItemObservations,
      clearCart,
      setCustomerData,
      setPaymentMethod,
      calculateDelivery,
      applyPromotions,
      nextStep,
      previousStep,
      goToStep,
      createOrder,
      generateWhatsAppMessage,
      generateDetailedWhatsAppMessage
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