'use client';

import React, { useState, useMemo } from 'react';
import { MenuHeader } from '@/components/MenuHeader';
import { MenuCategory } from '@/components/MenuCategory';
import CategoryTabs from '@/components/CategoryTabs';
import { OrderInstructions } from '@/components/OrderInstructions';
import { PDFButton } from '@/components/PDFButton';
import { PDFFooter } from '@/components/PDFFooter';
import { Cart } from '@/components/Cart';
import { SearchBar } from '@/components/SearchBar';
import { FeaturedItems } from '@/components/FeaturedItems';
import { CartProvider } from '@/context/CartContext';
import { restaurantInfo, menuItems, categories } from '@/data/menu';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('tapioca-3-4');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar itens por busca e categoria
  const filteredItems = useMemo(() => {
    let items = menuItems;
    
    // Filtrar por busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(query)
        )
      );
    }
    
    // Filtrar por categoria (se não há busca ativa)
    if (!searchQuery.trim()) {
      items = items.filter(item => item.category === activeCategory);
    }
    
    return items;
  }, [searchQuery, activeCategory]);
  
  // Encontrar informações da categoria ativa
  const currentCategory = categories.find(cat => cat.id === activeCategory);

  return (
    <CartProvider>
      <div className="menu-container min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        <div id="menu-content">
          <MenuHeader restaurantInfo={restaurantInfo} />
          
          <SearchBar 
            onSearch={setSearchQuery}
            placeholder="Buscar tapiocas, ingredientes..."
          />
          
          {!searchQuery && (
            <CategoryTabs 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          )}
          
          <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-12">
            <OrderInstructions />
            
            {!searchQuery && (
              <FeaturedItems items={menuItems} />
            )}
            
            {searchQuery ? (
              <MenuCategory 
                category={{
                  id: 'search-results',
                  name: `Resultados para "${searchQuery}"`,
                  description: `${filteredItems.length} item${filteredItems.length !== 1 ? 'ns' : ''} encontrado${filteredItems.length !== 1 ? 's' : ''}`,
                  items: filteredItems
                }}
              />
            ) : currentCategory && (
              <MenuCategory 
                category={{
                  id: currentCategory.id,
                  name: currentCategory.name,
                  description: activeCategory === 'tapioca-3-4' || activeCategory === 'tapioca-2' 
                    ? 'Queijo coalho ou mussarela (salada opcional)' 
                    : '',
                  items: filteredItems
                }}
              />
            )}
            
            <div className="text-center mt-16 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-8 inline-block">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Informações de Pagamento
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>PIX:</strong> {restaurantInfo.pix}</p>
                  <p><strong>Telefone:</strong> {restaurantInfo.phone}</p>
                  <p><strong>Instagram:</strong> {restaurantInfo.instagram}</p>
                </div>
              </div>
            </div>
          </main>
          
          <PDFFooter />
        </div>
        
        <PDFButton 
          elementId="menu-content" 
          filename="cardapio-tapioca-recheada.pdf"
        />
        
        <Cart />
      </div>
    </CartProvider>
  );
} 