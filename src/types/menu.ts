export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Para promoções
  image?: string;
  category: 'tapioca-3-4' | 'tapioca-2' | 'crepioca' | 'tapioca-simples' | 'tapioca-doces' | 'lanches' | 'bebidas';
  ingredients: string[];
  isSpecial?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  rating?: number;
  totalReviews?: number;
  preparationTime?: number; // em minutos
  discount?: number; // porcentagem de desconto
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  observations?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export interface RestaurantInfo {
  name: string;
  location?: string;
  phone: string;
  instagram: string;
  pix: string;
  address?: string;
  deliveryArea?: string;
}

// Novos tipos para sistema de pedidos
export interface DeliveryAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  reference?: string;
}

export interface CustomerData {
  name: string;
  phone: string;
  email?: string;
  address: DeliveryAddress;
}

export interface PaymentMethod {
  type: 'pix' | 'card' | 'money';
  needsChange?: boolean;
  changeAmount?: number;
  cardType?: 'credit' | 'debit';
}

export interface DeliveryInfo {
  fee: number;
  estimatedTime: number; // em minutos
  zone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerData;
  payment: PaymentMethod;
  delivery: DeliveryInfo;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  observations?: string;
}

export interface OrderStatus {
  current: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  history: Array<{
    status: string;
    timestamp: Date;
    message?: string;
  }>;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'freeDelivery' | 'combo';
  value: number;
  minOrderValue?: number;
  validUntil?: Date;
  isActive: boolean;
  conditions?: {
    categories?: string[];
    minItems?: number;
    dayOfWeek?: number[];
    timeRange?: {
      start: string;
      end: string;
    };
  };
}

export interface DeliveryZone {
  id: string;
  name: string;
  neighborhoods: string[];
  fee: number;
  estimatedTime: number;
  isActive: boolean;
} 