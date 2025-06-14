import { DeliveryZone, Promotion } from '@/types/menu';

export const deliveryZones: DeliveryZone[] = [
  {
    id: 'zona-moxoto',
    name: 'Moxotó (Mesmo Bairro)',
    neighborhoods: [
      'Moxotó', 'MOXOTÓ', 'moxoto', 'MOXOTO', 'moxotó',
      'Moxoto', 'moxoto bahia', 'MOXOTO BAHIA', 'Moxotó Bahia', 'MOXOTÓ BAHIA'
    ],
    fee: 5.00,
    estimatedTime: 10,
    isActive: true
  },
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
  
  // PRIORIDADE 1: Verificar se é Moxotó (mesmo bairro da lanchonete)
  if (searchTerm.includes('moxoto') || searchTerm.includes('moxotó')) {
    return deliveryZones.find(zone => zone.id === 'zona-moxoto')!;
  }
  
  // PRIORIDADE 2: Buscar correspondência exata ou parcial nas zonas específicas
  const exactMatch = deliveryZones.find(zone => 
    zone.isActive && zone.id !== 'zona-moxoto' && zone.neighborhoods.some(n => 
      n.toLowerCase() === searchTerm ||
      n.toLowerCase().includes(searchTerm) ||
      searchTerm.includes(n.toLowerCase())
    )
  );
  
  if (exactMatch) return exactMatch;
  
  // PRIORIDADE 3: Para cidades vizinhas conhecidas
  const cidadesVizinhas = ['gloria', 'chorrocho', 'rodelas', 'belem', 'macurure', 'petrolina', 'juazeiro'];
  if (cidadesVizinhas.some(cidade => searchTerm.includes(cidade))) {
    return deliveryZones.find(zone => zone.id === 'zona-cidades-vizinhas')!;
  }
  
  // FALLBACK: SEMPRE ENTREGA! Usa zona do mesmo bairro (R$ 5,00) como padrão
  return deliveryZones.find(zone => zone.id === 'zona-moxoto')!;
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