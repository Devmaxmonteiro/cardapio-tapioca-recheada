'use client';

import React from 'react';
import { MenuHeader } from '@/components/MenuHeader';
import { MenuCategory } from '@/components/MenuCategory';
import { OrderInstructions } from '@/components/OrderInstructions';
import { PDFButton } from '@/components/PDFButton';
import { PDFFooter } from '@/components/PDFFooter';
import { Cart } from '@/components/Cart';
import { restaurantInfo, menuCategories } from '@/data/menu';

export default function Home() {
  return (
    <div className="menu-container">
      <div id="menu-content">
        <MenuHeader restaurantInfo={restaurantInfo} />
        
        <main className="max-w-7xl mx-auto px-4 py-12">
          <OrderInstructions />
          
          {menuCategories.map((category) => (
            <MenuCategory 
              key={category.id} 
              category={category} 
            />
          ))}
          
          <div className="text-center mt-16 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-8 inline-block">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Informações de Pagamento
              </h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>PIX:</strong> {restaurantInfo.pixKey}</p>
                <p><strong>Nome:</strong> {restaurantInfo.pixName}</p>
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
  );
} 