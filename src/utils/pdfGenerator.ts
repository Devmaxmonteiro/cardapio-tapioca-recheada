import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateMenuPDF = async (elementId: string, filename: string = 'cardapio-tapioca.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento não encontrado');
    }

    // Configurações para melhor qualidade
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Adiciona a primeira página
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Adiciona páginas adicionais se necessário
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Salva o PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return false;
  }
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}; 