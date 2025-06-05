import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tapioca Recheada de Chapa - Cardápio Digital',
  description: 'Cardápio digital da Tapioca Recheada de Chapa com as melhores tapiocas da região',
  keywords: 'tapioca, cardápio, digital, recheada, chapa, nordeste, comida regional',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
} 