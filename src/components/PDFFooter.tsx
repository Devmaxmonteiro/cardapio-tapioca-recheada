'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { restaurantInfo } from '@/data/menu';

export const PDFFooter: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // URL do cardápio digital (você pode alterar para sua URL de produção)
        const menuUrl = window.location.origin;
        const qrUrl = await QRCode.toDataURL(menuUrl, {
          width: 150,
          margin: 2,
          color: {
            dark: '#ea580c', // cor primária
            light: '#ffffff'
          }
        });
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
      }
    };

    generateQRCode();
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-8 mt-12 print:mt-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Informações de Pedido */}
          <div>
            <h3 className="text-2xl font-bold mb-4">📱 COMO FAZER SEU PEDIDO</h3>
            <div className="space-y-3 text-lg">
              <div className="flex items-start space-x-3">
                <span className="bg-white text-primary-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <p>Escaneie o QR Code ao lado ou acesse nosso cardápio digital</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-white text-primary-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <p>Adicione suas tapiocas e bebidas favoritas ao carrinho</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-white text-primary-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <p>Clique em &quot;Enviar Pedido via WhatsApp&quot;</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-white text-primary-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <p>Informe seu endereço e confirme o pedido</p>
              </div>
            </div>
          </div>

          {/* QR Code e Contato */}
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              {qrCodeUrl ? (
                <Image src={qrCodeUrl} alt="QR Code do Cardápio" width={128} height={128} className="mx-auto" />
              ) : (
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">QR Code</span>
                </div>
              )}
            </div>
            <p className="text-sm mb-4">Escaneie para acessar o cardápio digital</p>
            
            <div className="space-y-2">
              <p className="text-xl font-bold">📞 {restaurantInfo.phone}</p>
              <p className="text-lg">📱 {restaurantInfo.instagram}</p>
              <div className="bg-white/20 rounded-lg p-3 mt-4">
                <p className="font-bold">💳 PAGAMENTO VIA PIX</p>
                <p className="text-sm">Chave: {restaurantInfo.pixKey}</p>
                <p className="text-sm">Nome: {restaurantInfo.pixName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Aviso importante */}
        <div className="border-t border-white/30 pt-6 mt-6 text-center">
          <p className="text-lg font-bold mb-2">⚠️ IMPORTANTE</p>
          <p className="text-sm">
            Este PDF é apenas para visualização. Para fazer pedidos, use o QR Code acima 
            ou acesse nosso cardápio digital interativo onde você pode adicionar itens ao carrinho 
            e enviar seu pedido diretamente pelo WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}; 