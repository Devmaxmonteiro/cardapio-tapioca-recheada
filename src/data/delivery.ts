import { DeliveryZone, Promotion } from '@/types/menu';

export const deliveryZones: DeliveryZone[] = [
  {
    id: 'zona-reciclagem',
    name: 'Reciclagem',
    neighborhoods: [
      'Reciclagem', 'RECICLAGEM', 'reciclagem'
    ],
    fee: 5.00,
    estimatedTime: 15,
    isActive: true
  },
  {
    id: 'zona-jardim-bahia',
    name: 'Jardim Bahia',
    neighborhoods: [
      'Jardim Bahia', 'JARDIM BAHIA', 'jardim bahia',
      'Jardim da Bahia', 'JARDIM DA BAHIA', 'jardim da bahia'
    ],
    fee: 7.00,
    estimatedTime: 20,
    isActive: true
  },
  {
    id: 'zona-prainha',
    name: 'Prainha',
    neighborhoods: [
      'Prainha', 'PRAINHA', 'prainha'
    ],
    fee: 8.00,
    estimatedTime: 25,
    isActive: true
  },
  {
    id: 'zona-seriema',
    name: 'Seriema',
    neighborhoods: [
      'Seriema', 'SERIEMA', 'seriema'
    ],
    fee: 8.00,
    estimatedTime: 25,
    isActive: true
  },
  {
    id: 'zona-centro',
    name: 'Centro da Cidade',
    neighborhoods: [
      'Centro', 'CENTRO', 'centro',
      'Centro da Cidade', 'CENTRO DA CIDADE', 'centro da cidade',
      'Centro Histórico', 'centro historico', 'CENTRO HISTÓRICO'
    ],
    fee: 9.00,
    estimatedTime: 30,
    isActive: true
  },
  {
    id: 'zona-balneario',
    name: 'Balneário',
    neighborhoods: [
      'Balneário', 'BALNEÁRIO', 'balneario', 'BALNEARIO',
      'balneário'
    ],
    fee: 10.00,
    estimatedTime: 35,
    isActive: true
  },
  {
    id: 'zona-paulo-afonso-geral',
    name: 'Paulo Afonso - Outros Bairros',
    neighborhoods: [
      'Paulo Afonso', 'PA', 'paulo afonso', 'PAULO AFONSO',
      'Bahia', 'BA', 'bahia', 'BAHIA',
      'Vila Nova', 'Cidade Nova', 'Jardim Primavera', 'Brasília', 'São Vicente',
      'Alto da Boa Vista', 'Landulfo Alves', 'Oliveira Brito', 'OLIVEIRA BRITO',
      'Tancredo Neves', 'Portal', 'Parque dos Pássaros', 'Vila Militar',
      'João XXIII', 'Padre Cicero', 'Bom Jesus', 'Santa Rita',
      'José Bonifácio', 'Buracão', 'Alto do Cruzeiro', 'Vila Rica'
    ],
    fee: 6.00,
    estimatedTime: 25,
    isActive: true
  },
  {
    id: 'zona-cidades-vizinhas',
    name: 'Cidades Vizinhas',
    neighborhoods: [
      'Glória', 'GLÓRIA', 'gloria',
      'Chorrochó', 'CHORROCHÓ', 'chorrocho',
      'Rodelas', 'RODELAS', 'rodelas',
      'Belém do São Francisco', 'BELÉM DO SÃO FRANCISCO', 'belem do sao francisco',
      'Macururé', 'MACURURÉ', 'macurure',
      'Petrolina', 'PETROLINA', 'petrolina',
      'Juazeiro', 'JUAZEIRO', 'juazeiro'
    ],
    fee: 12.00,
    estimatedTime: 60,
    isActive: true
  }
];

export const activePromotions: Promotion[] = [
  {
    id: 'promo-1',
    name: 'Frete Grátis',
    description: 'Frete grátis para pedidos acima de R$ 50,00 em Paulo Afonso e região',
    type: 'freeDelivery',
    value: 0,
    minOrderValue: 50.00,
    isActive: true,
    conditions: {
      dayOfWeek: [0, 1, 2, 3, 4, 5, 6] // Todos os dias
    }
  }
  // Removidas as promoções de desconto percentual
];

export const calculateDeliveryFee = (neighborhood: string): DeliveryZone => {
  const searchTerm = neighborhood.toLowerCase().trim();
  
  // Primeiro, tenta encontrar uma correspondência exata ou parcial
  const exactMatch = deliveryZones.find(zone => 
    zone.isActive && zone.neighborhoods.some(n => 
      n.toLowerCase() === searchTerm ||
      n.toLowerCase().includes(searchTerm) ||
      searchTerm.includes(n.toLowerCase())
    )
  );
  
  if (exactMatch) return exactMatch;
  
  // Se contém Paulo Afonso ou BA, usa a zona geral de Paulo Afonso
  if (searchTerm.includes('paulo') || searchTerm.includes('afonso') || 
      searchTerm.includes('pa') || searchTerm.includes('bahia') || 
      searchTerm.includes('ba')) {
    return deliveryZones.find(zone => zone.id === 'zona-paulo-afonso-geral')!;
  }
  
  // Para cidades vizinhas conhecidas
  const cidadesVizinhas = ['gloria', 'chorrocho', 'rodelas', 'belem', 'macurure', 'petrolina', 'juazeiro'];
  if (cidadesVizinhas.some(cidade => searchTerm.includes(cidade))) {
    return deliveryZones.find(zone => zone.id === 'zona-cidades-vizinhas')!;
  }
  
  // FALLBACK: SEMPRE ENTREGA! Usa zona Paulo Afonso geral como padrão
  return deliveryZones.find(zone => zone.id === 'zona-paulo-afonso-geral')!;
};

export const getApplicablePromotions = (
  subtotal: number, 
  items: number, 
  currentTime: Date = new Date()
): Promotion[] => {
  const currentDay = currentTime.getDay();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

  return activePromotions.filter(promo => {
    if (!promo.isActive) return false;
    
    // Verificar valor mínimo
    if (promo.minOrderValue && subtotal < promo.minOrderValue) return false;
    
    // Verificar validade
    if (promo.validUntil && currentTime > promo.validUntil) return false;
    
    // Verificar condições
    if (promo.conditions) {
      // Verificar dia da semana
      if (promo.conditions.dayOfWeek && !promo.conditions.dayOfWeek.includes(currentDay)) {
        return false;
      }
      
      // Verificar horário
      if (promo.conditions.timeRange) {
        const { start, end } = promo.conditions.timeRange;
        if (timeString < start || timeString > end) return false;
      }
      
      // Verificar quantidade mínima de itens
      if (promo.conditions.minItems && items < promo.conditions.minItems) return false;
    }
    
    return true;
  });
}; 