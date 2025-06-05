export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: 'tapioca-3-4' | 'tapioca-2' | 'crepioca' | 'tapioca-simples' | 'tapioca-doces' | 'lanches' | 'bebidas';
  ingredients: string[];
  isSpecial?: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export interface RestaurantInfo {
  name: string;
  phone: string;
  instagram: string;
  pix: string;
} 