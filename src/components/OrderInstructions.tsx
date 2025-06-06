import React from 'react';
import { ShoppingCart, MessageCircle, MapPin, CreditCard } from 'lucide-react';

export const OrderInstructions: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-8 rounded-lg shadow-lg mb-12 no-print">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          🛒 Como Fazer Seu Pedido Online
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">1. Adicione ao Carrinho</h3>
            <p className="text-sm">
              Clique em &quot;Adicionar&quot; nos itens que deseja. O carrinho fica no canto inferior esquerdo.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">2. Envie via WhatsApp</h3>
            <p className="text-sm">
              Abra o carrinho e clique em &quot;Enviar Pedido via WhatsApp&quot;. Você será redirecionado.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">3. Informe o Endereço</h3>
            <p className="text-sm">
              No WhatsApp, informe seu endereço completo para entrega.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">4. Pague com PIX</h3>
            <p className="text-sm">
              Pagamento via PIX. A chave já estará na mensagem do WhatsApp.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-8 p-4 bg-white/10 rounded-lg">
          <p className="text-lg font-semibold">
            💡 Dica: O carrinho salva seus itens enquanto você navega pelo cardápio!
          </p>
        </div>
      </div>
    </div>
  );
}; 