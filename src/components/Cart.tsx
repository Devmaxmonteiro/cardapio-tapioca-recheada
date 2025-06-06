'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/pdfGenerator';
import { ShoppingCart, Plus, Minus, Trash2, MessageCircle, X, Edit3, ArrowRight } from 'lucide-react';
import { restaurantInfo } from '@/data/menu';
import { Checkout } from './Checkout';

export const Cart: React.FC = () => {
  const { state, updateQuantity, removeItem, clearCart, updateItemObservations, generateWhatsAppMessage, goToStep } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [editingObservations, setEditingObservations] = useState<number | null>(null);
  const [tempObservations, setTempObservations] = useState('');

  const handleSendWhatsApp = () => {
    if (state.items.length === 0) return;
    
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/55${restaurantInfo.phone.replace(/\D/g, '')}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleCheckout = () => {
    if (state.items.length === 0) return;
    
    goToStep('customer');
    setShowCheckout(true);
    setIsOpen(false);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleSaveObservations = (id: number) => {
    updateItemObservations(id, tempObservations);
    setEditingObservations(null);
    setTempObservations('');
  };

  const handleEditObservations = (id: number, currentObservations: string = '') => {
    setEditingObservations(id);
    setTempObservations(currentObservations);
  };

  return (
    <>
      {/* Botão do Carrinho Flutuante */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 bg-primary-600 hover:bg-primary-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
          {state.itemCount > 0 && (
            <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-secondary-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
              {state.itemCount}
            </span>
          )}
        </div>
      </button>

      {/* Modal do Carrinho */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg max-w-sm sm:max-w-md w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-primary-600 text-white p-3 sm:p-4 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Meu Pedido</span>
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Conteúdo do Carrinho */}
            <div className="p-4 flex-1 overflow-y-auto">
              {state.items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Seu carrinho está vazio</p>
                  <p className="text-sm">Adicione itens do cardápio!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="bg-red-100 hover:bg-red-200 text-red-600 p-1 rounded ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Observações */}
                      <div className="mt-2">
                        {editingObservations === item.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={tempObservations}
                              onChange={(e) => setTempObservations(e.target.value)}
                              placeholder="Observações para este item..."
                              className="w-full p-2 text-sm border border-gray-300 rounded resize-none"
                              rows={2}
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleSaveObservations(item.id)}
                                className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded"
                              >
                                Salvar
                              </button>
                              <button
                                onClick={() => setEditingObservations(null)}
                                className="bg-gray-400 hover:bg-gray-500 text-white text-xs px-2 py-1 rounded"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            {item.observations ? (
                              <p className="text-xs text-gray-600 flex-1">📝 {item.observations}</p>
                            ) : (
                              <p className="text-xs text-gray-400 flex-1">Sem observações</p>
                            )}
                            <button
                              onClick={() => handleEditObservations(item.id, item.observations)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer com Total e Botões - SEMPRE VISÍVEL */}
            {state.items.length > 0 && (
              <div className="border-t bg-white p-4 space-y-4 flex-shrink-0 shadow-lg">
                {/* Resumo dos Valores */}
                <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center text-xl font-bold text-orange-600">
                    <span>Total com Entrega:</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                  
                  {state.deliveryFee > 0 && (
                    <div className="flex justify-between text-sm text-gray-600 border-t pt-2">
                      <span>📦 Taxa de entrega: {formatPrice(state.deliveryFee)}</span>
                      <span>⏰ {state.delivery?.estimatedTime || 0} min</span>
                    </div>
                  )}
                </div>
                
                {/* Botões de Ação */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-4 px-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    <span>🛒 FINALIZAR PEDIDO</span>
                    <ArrowRight className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">📱 Envio Rápido via WhatsApp</span>
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
                  >
                    Limpar Carrinho
                  </button>
                </div>
                
                <div className="text-xs text-gray-500 text-center">
                  <p>💳 PIX: {restaurantInfo.pix}</p>
                  <p>📱 WhatsApp: {restaurantInfo.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <Checkout 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
      />
    </>
  );
}; 