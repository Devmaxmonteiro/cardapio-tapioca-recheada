import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { generateMenuPDF } from '@/utils/pdfGenerator';

interface PDFButtonProps {
  elementId: string;
  filename?: string;
}

export const PDFButton: React.FC<PDFButtonProps> = ({ 
  elementId, 
  filename = 'cardapio-tapioca.pdf' 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const success = await generateMenuPDF(elementId, filename);
      if (success) {
        // Opcional: mostrar notificação de sucesso
        console.log('PDF gerado com sucesso!');
      } else {
        console.error('Erro ao gerar PDF');
      }
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleGeneratePDF}
      disabled={isGenerating}
      className="fixed bottom-6 right-6 bg-secondary-600 hover:bg-secondary-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 z-50"
    >
      {isGenerating ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Download className="w-5 h-5" />
      )}
      <span className="font-medium">
        {isGenerating ? 'Gerando PDF...' : 'Baixar PDF'}
      </span>
    </button>
  );
}; 