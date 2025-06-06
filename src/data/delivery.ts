import { DeliveryZone, Promotion } from '@/types/menu';

export const deliveryZones: DeliveryZone[] = [
  {
    id: 'zona-centro',
    name: 'Centro e Adjacências',
    neighborhoods: [
      'Centro', 'Centro Histórico', 'Praça da Matriz', 'Rua Principal', 
      'Mercado Central', 'Vila Nova', 'Cidade Nova', 'Jardim Primavera',
      'Brasília', 'São Vicente', 'Alto da Boa Vista', 'Landulfo Alves',
      'Oliveira Brito', 'OLIVEIRA BRITO', 'oliveira brito'
    ],
    fee: 3.00,
    estimatedTime: 20,
    isActive: true
  },
  {
    id: 'zona-tancredo-neves',
    name: 'Tancredo Neves e Região',
    neighborhoods: [
      'Tancredo Neves', 'Portal', 'Parque dos Pássaros', 'Vila Militar',
      'Conjunto Habitacional', 'Parque Industrial', 'Loteamento Novo',
      'Jardim América', 'Vila do Sol', 'Jardim Bahia', 'Santo Antônio',
      'TANCREDO NEVES', 'tancredo neves'
    ],
    fee: 4.00,
    estimatedTime: 25,
    isActive: true
  },
  {
    id: 'zona-joao-xxiii',
    name: 'João XXIII e Arredores',
    neighborhoods: [
      'João XXIII', 'Padre Cicero', 'Bom Jesus', 'Santa Rita',
      'São Francisco', 'Conjunto João XXIII', 'Vila União',
      'Conjunto Morada Nova', 'Jardim Europa', 'Bela Vista',
      'JOÃO XXIII', 'JOAO XXIII', 'joao xxiii', 'joão xxiii'
    ],
    fee: 4.50,
    estimatedTime: 30,
    isActive: true
  },
  {
    id: 'zona-expansao',
    name: 'Zona de Expansão',
    neighborhoods: [
      'José Bonifácio', 'Buracão', 'Alto do Cruzeiro', 'Vila Rica',
      'Conjunto Morada do Sol', 'Residencial Palmeiras', 'Condomínio Feliz',
      'Loteamento Jardim das Flores', 'Vila Operária', 'Nova Paulo Afonso',
      'Conjunto Paulo VI', 'Dique', 'General Dutra', 'JOSÉ BONIFÁCIO',
      'BURACÃO', 'buracão', 'jose bonifacio'
    ],
    fee: 5.00,
    estimatedTime: 35,
    isActive: true
  },
  {
    id: 'zona-rural',
    name: 'Zona Rural e Distritos',
    neighborhoods: [
      'Sítios', 'Chácaras', 'Zona Rural', 'Povoados',
      'Distrito de Raso da Catarina', 'Fazendas', 'Assentamentos',
      'Paulo Afonso Rural', 'Perímetro Rural', 'ZONA RURAL'
    ],
    fee: 8.00,
    estimatedTime: 45,
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
  },
  {
    id: 'zona-geral-paulo-afonso',
    name: 'Paulo Afonso - Todo Território',
    neighborhoods: [
      'Paulo Afonso', 'PA', 'paulo afonso', 'PAULO AFONSO',
      'Bahia', 'BA', 'bahia', 'BAHIA'
    ],
    fee: 4.00,
    estimatedTime: 30,
    isActive: true
  }
];

export const activePromotions: Promotion[] = [
  {
    id: 'promo-1',
    name: 'Frete Grátis',
    description: 'Frete grátis para pedidos acima de R$ 30,00 em Paulo Afonso e região',
    type: 'freeDelivery',
    value: 0,
    minOrderValue: 30.00,
    isActive: true,
    conditions: {
      dayOfWeek: [0, 1, 2, 3, 4, 5, 6] // Todos os dias
    }
  },
  {
    id: 'promo-2',
    name: 'Desconto 10%',
    description: '10% de desconto em pedidos acima de R$ 50,00',
    type: 'percentage',
    value: 10,
    minOrderValue: 50.00,
    validUntil: new Date('2024-12-31'),
    isActive: true
  },
  {
    id: 'promo-3',
    name: 'Happy Hour',
    description: '15% de desconto das 14h às 17h',
    type: 'percentage',
    value: 15,
    minOrderValue: 25.00,
    isActive: true,
    conditions: {
      timeRange: {
        start: '14:00',
        end: '17:00'
      },
      dayOfWeek: [1, 2, 3, 4, 5] // Segunda a sexta
    }
  }
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
    return deliveryZones.find(zone => zone.id === 'zona-geral-paulo-afonso')!;
  }
  
  // Para cidades vizinhas conhecidas
  const cidadesVizinhas = ['gloria', 'chorrocho', 'rodelas', 'belem', 'macurure', 'petrolina', 'juazeiro'];
  if (cidadesVizinhas.some(cidade => searchTerm.includes(cidade))) {
    return deliveryZones.find(zone => zone.id === 'zona-cidades-vizinhas')!;
  }
  
  // FALLBACK: SEMPRE ENTREGA! Usa zona centro como padrão
  return deliveryZones.find(zone => zone.id === 'zona-centro')!;
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