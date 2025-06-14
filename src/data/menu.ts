import { MenuItem } from '@/types/menu';

export const menuItems: MenuItem[] = [
  // Tapioca 3 e 4 sabores
  {
    id: 1,
    name: "DELÍCIA",
    description: "Queijo, côco e manteiga",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Côco", "Manteiga"],
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Tapioca+Delicia",
    isPopular: true,
    rating: 4.8,
    totalReviews: 127,
    preparationTime: 8
  },
  {
    id: 2,
    name: "PÉ DE SOGRA",
    description: "Queijo, ovo e frango",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Ovo", "Frango"],
    image: "https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Tapioca+Pe+de+Sogra",
    isPopular: true,
    rating: 4.6,
    totalReviews: 156,
    preparationTime: 10
  },
  {
    id: 3,
    name: "RAÇUDO",
    description: "Queijo, ovo, carne de sol e cream cheese",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Ovo", "Carne de sol", "Cream cheese"],
    image: "https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Tapioca+Racudo",
    isSpecial: true,
    rating: 4.9,
    totalReviews: 98,
    preparationTime: 12
  },
  {
    id: 4,
    name: "SERTANEJA",
    description: "Queijo, ovo e carne de sol",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Ovo", "Carne de sol"],
    image: "https://via.placeholder.com/400x300/F4A460/FFFFFF?text=Tapioca+Sertaneja"
  },
  {
    id: 5,
    name: "JOÃO GRILO",
    description: "Queijo, ovo, calabresa e cream cheese",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Ovo", "Calabresa", "Cream cheese"],
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Tapioca"
  },
  {
    id: 6,
    name: "CAIPIRA",
    description: "Queijo, ovo e calabresa",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Ovo", "Calabresa"],
    image: "https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Tapioca"
  },
  {
    id: 7,
    name: "SEVERINO NORDESTINO",
    description: "Queijo, carne de sol, frango e cream cheese",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Carne de sol", "Frango", "Cream cheese"],
    image: "https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Tapioca"
  },
  {
    id: 8,
    name: "LAMPIÃO",
    description: "Queijo, frango e carne de sol",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Frango", "Carne de sol"],
    image: "https://via.placeholder.com/400x300/F4A460/FFFFFF?text=Tapioca"
  },
  {
    id: 9,
    name: "CAATINGA",
    description: "Queijo, carne de sol, frango e ovo",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Carne de sol", "Frango", "Ovo"],
    image: "https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Tapioca"
  },
  {
    id: 10,
    name: "ROCEIRA",
    description: "Queijo, frango e calabresa",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Frango", "Calabresa"],
    image: "https://via.placeholder.com/400x300/B8860B/FFFFFF?text=Tapioca"
  },
  {
    id: 11,
    name: "RISCA FACA",
    description: "Queijo, frango e catupiry",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Frango", "Catupiry"],
    image: "https://via.placeholder.com/400x300/BC8F8F/FFFFFF?text=Tapioca"
  },
  {
    id: 12,
    name: "DONA FLOR",
    description: "Queijo, frango e milho",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Frango", "Milho"],
    image: "https://via.placeholder.com/400x300/F5DEB3/FFFFFF?text=Tapioca"
  },
  {
    id: 13,
    name: "VIXE MARIA",
    description: "Queijo, frango, milho e cream cheese",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Frango", "Milho", "Cream cheese"],
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Tapioca"
  },
  {
    id: 14,
    name: "CRENDEUSPAI",
    description: "Queijo, carne de sol e catupiry",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Carne de sol", "Catupiry"],
    image: "https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Tapioca"
  },
  {
    id: 15,
    name: "FLOR DE MANDACARU",
    description: "Queijo, bacon, frango e cream cheese",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Bacon", "Frango", "Cream cheese"],
    image: "https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Tapioca"
  },
  {
    id: 16,
    name: "ASA BRANCA",
    description: "Queijo, milho, frango e bacon",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Milho", "Frango", "Bacon"],
    image: "https://via.placeholder.com/400x300/F4A460/FFFFFF?text=Tapioca"
  },
  {
    id: 17,
    name: "LASQUEIRA",
    description: "Queijo, bacon e frango",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Bacon", "Frango"],
    image: "https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Tapioca"
  },
  {
    id: 18,
    name: "AI SIM",
    description: "Queijo, carne de sol e bacon",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Carne de sol", "Bacon"],
    image: "https://via.placeholder.com/400x300/B8860B/FFFFFF?text=Tapioca"
  },
  {
    id: 19,
    name: "TAPIOCA SABOR PIZZA",
    description: "Queijo, presunto, tomate, cebola e orégano",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Presunto", "Tomate", "Cebola", "Orégano"],
    image: "https://via.placeholder.com/400x300/BC8F8F/FFFFFF?text=Tapioca",
    isNew: true,
    rating: 4.7,
    totalReviews: 45,
    preparationTime: 12
  },
  {
    id: 20,
    name: "MARIA BONITA",
    description: "Queijo, carne de sol e banana terra caramelizada na manteiga",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Carne de sol", "Banana terra caramelizada"],
    image: "https://via.placeholder.com/400x300/F5DEB3/FFFFFF?text=Tapioca"
  },
  {
    id: 21,
    name: "MEU XODÓ",
    description: "Queijo, purê de macaxeira e carne de sol",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Purê de macaxeira", "Carne de sol"],
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Tapioca"
  },
  {
    id: 22,
    name: "CABRA MACHO",
    description: "Queijo, purê de macaxeira e frango",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Purê de macaxeira", "Frango"],
    image: "https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Tapioca"
  },
  {
    id: 23,
    name: "SERTÃO",
    description: "Queijo, purê de macaxeira, carne de sol e banana terra",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["Queijo", "Purê de macaxeira", "Carne de sol", "Banana terra"],
    image: "https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Tapioca"
  },
  {
    id: 24,
    name: "TUDÃO",
    description: "Até 7 sabores",
    price: 19.00,
    originalPrice: 22.00,
    category: 'tapioca-3-4',
    ingredients: ["Até 7 sabores à escolha"],
    image: "https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Tapioca+Tudao",
    discount: 14,
    isPopular: true,
    rating: 4.7,
    totalReviews: 205,
    preparationTime: 15
  },
  {
    id: 25,
    name: "TAPIOCA À MODA DO CLIENTE",
    description: "Monte sua tapioca",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["Ingredientes à escolha"],
    image: "https://via.placeholder.com/400x300/F4A460/FFFFFF?text=Tapioca"
  },

  // Tapioca 2 sabores
  {
    id: 26,
    name: "MARMENINO",
    description: "Manteiga e côco",
    price: 9.00,
    category: 'tapioca-2',
    ingredients: ["Manteiga", "Côco"],
    image: "https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Tapioca"
  },
  {
    id: 27,
    name: "VIRGULINO",
    description: "Queijo e côco",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["Queijo", "Côco"],
    image: "https://via.placeholder.com/400x300/B8860B/FFFFFF?text=Tapioca"
  },
  {
    id: 28,
    name: "OXENTE",
    description: "Queijo e ovo",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["Queijo", "Ovo"],
    image: "https://via.placeholder.com/400x300/BC8F8F/FFFFFF?text=Tapioca"
  },
  {
    id: 29,
    name: "MISTA",
    description: "Queijo e presunto",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["Queijo", "Presunto"],
    image: "https://via.placeholder.com/400x300/F5DEB3/FFFFFF?text=Tapioca"
  },
  {
    id: 30,
    name: "VITÓRIA",
    description: "Queijo e frango",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["Queijo", "Frango"],
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Tapioca"
  },
  {
    id: 31,
    name: "NORDESTINA",
    description: "Queijo e carne de sol",
    price: 14.00,
    category: 'tapioca-2',
    ingredients: ["Queijo", "Carne de sol"],
    image: "https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Tapioca"
  },
  {
    id: 32,
    name: "PELEJA",
    description: "Queijo e calabresa",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["Queijo", "Calabresa"],
    image: "https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Tapioca"
  },
  {
    id: 33,
    name: "SUSTANÇA",
    description: "Queijo e bacon",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["Queijo", "Bacon"],
    image: "https://via.placeholder.com/400x300/F4A460/FFFFFF?text=Tapioca"
  },
  {
    id: 34,
    name: "ARRETADA",
    description: "Carne de sol e frango",
    price: 14.00,
    category: 'tapioca-2',
    ingredients: ["Carne de sol", "Frango"],
    image: "https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Tapioca"
  },
  {
    id: 35,
    name: "RAÇUDO",
    description: "Carne de sol e catupiry",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["Carne de sol", "Catupiry"],
    image: "https://via.placeholder.com/400x300/B8860B/FFFFFF?text=Tapioca"
  },
  {
    id: 36,
    name: "OXE",
    description: "Frango e catupiry",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["Frango", "Catupiry"],
    image: "https://via.placeholder.com/400x300/BC8F8F/FFFFFF?text=Tapioca"
  },
  {
    id: 37,
    name: "MATUTO",
    description: "Frango e ovo",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["Frango", "Ovo"],
    image: "https://via.placeholder.com/400x300/F5DEB3/FFFFFF?text=Tapioca"
  },
  {
    id: 38,
    name: "VALEI-ME",
    description: "Bacon e carne",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["Bacon", "Carne"],
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Tapioca"
  },
  {
    id: 39,
    name: "ZEMARUA",
    description: "Frango e cream cheese",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["Frango", "Cream cheese"],
    image: "https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Tapioca"
  },

  // Crepioca
  {
    id: 40,
    name: "PEITO DE PERU, QUEIJO COALHO E TOMATE",
    description: "Opção saudável",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Peito de peru", "Queijo coalho", "Tomate"],
    image: "https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Tapioca"
  },
  {
    id: 41,
    name: "BANANA DA TERRA CARAMELIZADA, MEL E CANELA",
    description: "Doce especial",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Banana da terra caramelizada", "Mel", "Canela"],
    image: "https://via.placeholder.com/400x300/F4A460/FFFFFF?text=Tapioca"
  },
  {
    id: 42,
    name: "BANANA DA TERRA CARAMELIZADA E PASTA DE AMENDOIM",
    description: "Combinação perfeita",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Banana da terra caramelizada", "Pasta de amendoim"],
    image: "https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Tapioca"
  },
  {
    id: 43,
    name: "FRANGO, ABACATE E AZEITE",
    description: "Opção fitness",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Frango", "Abacate", "Azeite"],
    image: "https://via.placeholder.com/400x300/B8860B/FFFFFF?text=Tapioca"
  },
  {
    id: 44,
    name: "FRANGO, ABACATE E QUEIJO",
    description: "Nutritiva e saborosa",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Frango", "Abacate", "Queijo"],
    image: "https://via.placeholder.com/400x300/BC8F8F/FFFFFF?text=Tapioca"
  },
  {
    id: 45,
    name: "PEITO DE PERU, FRANGO",
    description: "Rica em proteína",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Peito de peru", "Frango"],
    image: "https://via.placeholder.com/400x300/F5DEB3/FFFFFF?text=Tapioca"
  },
  {
    id: 46,
    name: "PEITO DE PERU, FRANGO E QUEIJO",
    description: "Completa e nutritiva",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Peito de peru", "Frango", "Queijo"],
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Tapioca"
  },
  {
    id: 47,
    name: "QUEIJO, CÔCO E MEL",
    description: "Doce e salgado",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Queijo", "Côco", "Mel"],
    image: "https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Tapioca"
  },
  {
    id: 48,
    name: "QUEIJO, MORANGO E MEL",
    description: "Frutada e doce",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Queijo", "Morango", "Mel"],
    image: "https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Tapioca"
  },
  {
    id: 49,
    name: "PEITO DE PERU, QUEIJO E MILHO",
    description: "Saudável e saborosa",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Peito de peru", "Queijo", "Milho"],
    image: "https://via.placeholder.com/400x300/F4A460/FFFFFF?text=Tapioca"
  },
  {
    id: 50,
    name: "FRANGO, MILHO E ORÉGANO",
    description: "Temperada especial",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Frango", "Milho", "Orégano"],
    image: "https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Tapioca"
  },
  {
    id: 51,
    name: "FRANGO, MILHO, QUEIJO E ORÉGANO",
    description: "Completa e temperada",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Frango", "Milho", "Queijo", "Orégano"],
    image: "https://via.placeholder.com/400x300/B8860B/FFFFFF?text=Tapioca"
  },
  {
    id: 52,
    name: "QUEIJO, FRANGO, E ORÉGANO",
    description: "Clássica temperada",
    price: 15.00,
    category: 'crepioca',
    ingredients: ["Queijo", "Frango", "Orégano"],
    image: "https://via.placeholder.com/400x300/BC8F8F/FFFFFF?text=Tapioca"
  },

  // Tapioca Simples
  {
    id: 53,
    name: "MASSA",
    description: "Tapioca simples",
    price: 3.00,
    category: 'tapioca-simples',
    ingredients: ["Massa de tapioca"],
    image: "https://via.placeholder.com/400x300/F5DEB3/FFFFFF?text=Tapioca"
  },
  {
    id: 54,
    name: "MANTEIGA DE GADO",
    description: "Com manteiga",
    price: 5.50,
    category: 'tapioca-simples',
    ingredients: ["Massa", "Manteiga de gado"],
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Tapioca"
  },
  {
    id: 55,
    name: "CÔCO",
    description: "Com côco",
    price: 5.50,
    category: 'tapioca-simples',
    ingredients: ["Massa", "Côco"],
    image: "https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Tapioca"
  },
  {
    id: 56,
    name: "OVO",
    description: "Com ovo",
    price: 6.00,
    category: 'tapioca-simples',
    ingredients: ["Massa", "Ovo"],
    image: "https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Tapioca"
  },
  {
    id: 57,
    name: "QUEIJO COALHO OU MUSSARELA",
    description: "Com queijo",
    price: 12.00,
    originalPrice: 14.00,
    category: 'tapioca-simples',
    ingredients: ["Massa", "Queijo coalho ou mussarela"],
    image: "https://via.placeholder.com/400x300/F4A460/FFFFFF?text=Tapioca",
    discount: 14,
    isPopular: true,
    rating: 4.8,
    totalReviews: 234,
    preparationTime: 5
  },
  {
    id: 58,
    name: "CARNE DE SOL",
    description: "Com carne de sol",
    price: 11.00,
    category: 'tapioca-simples',
    ingredients: ["Massa", "Carne de sol"],
    image: "https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Tapioca"
  },
  {
    id: 59,
    name: "FRANGO",
    description: "Com frango",
    price: 11.00,
    category: 'tapioca-simples',
    ingredients: ["Massa", "Frango"],
    image: "https://via.placeholder.com/400x300/B8860B/FFFFFF?text=Tapioca"
  },
  {
    id: 60,
    name: "CALABRESA",
    description: "Com calabresa",
    price: 8.00,
    category: 'tapioca-simples',
    ingredients: ["Massa", "Calabresa"],
    image: "https://via.placeholder.com/400x300/BC8F8F/FFFFFF?text=Tapioca"
  },

  // Tapioca Doces
  {
    id: 61,
    name: "DOÇURA",
    description: "Café e doce de leite",
    price: 12.00,
    category: 'tapioca-doces',
    ingredients: ["Café", "Doce de leite"],
    image: "https://via.placeholder.com/400x300/F5DEB3/FFFFFF?text=Tapioca"
  },
  {
    id: 62,
    name: "LUIZA",
    description: "Leite condensado, côco e queijo",
    price: 13.00,
    category: 'tapioca-doces',
    ingredients: ["Leite condensado", "Côco", "Queijo"],
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Tapioca"
  },
  {
    id: 63,
    name: "TERNURA",
    description: "Pasta de amendoim e nutella",
    price: 14.00,
    category: 'tapioca-doces',
    ingredients: ["Pasta de amendoim", "Nutella"],
    image: "https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Tapioca"
  },
  {
    id: 64,
    name: "DOCINHO",
    description: "Leite condensado e côco",
    price: 12.00,
    category: 'tapioca-doces',
    ingredients: ["Leite condensado", "Côco"],
    image: "https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Tapioca"
  },
  {
    id: 65,
    name: "FILHO DE MÃE",
    description: "Brigadeiro",
    price: 12.00,
    category: 'tapioca-doces',
    ingredients: ["Brigadeiro"],
    image: "https://via.placeholder.com/400x300/F4A460/FFFFFF?text=Tapioca"
  },
  {
    id: 66,
    name: "MORENINHA",
    description: "Brigadeiro e morango",
    price: 14.00,
    category: 'tapioca-doces',
    ingredients: ["Brigadeiro", "Morango"],
    image: "https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Tapioca"
  },
  {
    id: 67,
    name: "PITÉU",
    description: "Nutella",
    price: 13.00,
    category: 'tapioca-doces',
    ingredients: ["Nutella"],
    image: "https://via.placeholder.com/400x300/B8860B/FFFFFF?text=Tapioca"
  },
  {
    id: 68,
    name: "DELICADA",
    description: "Nutella e morango",
    price: 15.00,
    category: 'tapioca-doces',
    ingredients: ["Nutella", "Morango"],
    image: "https://via.placeholder.com/400x300/BC8F8F/FFFFFF?text=Tapioca"
  },
  {
    id: 69,
    name: "ROMEU E JULIETA",
    description: "Goiabada e queijo",
    price: 12.00,
    category: 'tapioca-doces',
    ingredients: ["Goiabada", "Queijo"],
    image: "https://via.placeholder.com/400x300/F5DEB3/FFFFFF?text=Tapioca"
  },

  // Lanches
  {
    id: 70,
    name: "COXINHA",
    description: "Frango e frango catupiry",
    price: 7.00,
    category: 'lanches',
    ingredients: ["Frango", "Frango catupiry"],
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Tapioca"
  },
  {
    id: 71,
    name: "MINI COXINHA NO COPO",
    description: "Mini coxinhas",
    price: 9.00,
    category: 'lanches',
    ingredients: ["Mini coxinhas"],
    image: "https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Tapioca"
  },
  {
    id: 72,
    name: "BAURU",
    description: "Misto e frango com queijo",
    price: 7.00,
    category: 'lanches',
    ingredients: ["Misto", "Frango", "Queijo"],
    image: "https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Tapioca"
  },
  {
    id: 73,
    name: "CACHORRO QUENTE",
    description: "Molho de carne, salsicha, vinagrete, batata e queijo ralado",
    price: 8.00,
    category: 'lanches',
    ingredients: ["Molho de carne", "Salsicha", "Vinagrete", "Batata", "Queijo ralado"],
    image: "https://via.placeholder.com/400x300/F4A460/FFFFFF?text=Tapioca"
  },
  {
    id: 74,
    name: "CACHORRO QUENTE",
    description: "Molho de frango, salsicha, vinagrete, batata e queijo ralado",
    price: 8.00,
    category: 'lanches',
    ingredients: ["Molho de frango", "Salsicha", "Vinagrete", "Batata", "Queijo ralado"],
    image: "https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Tapioca"
  },
  {
    id: 75,
    name: "EMPADA",
    description: "Empada tradicional",
    price: 4.50,
    category: 'lanches',
    ingredients: ["Recheio tradicional"],
    image: "https://via.placeholder.com/400x300/B8860B/FFFFFF?text=Tapioca"
  },
  {
    id: 76,
    name: "ENROLADINHO",
    description: "Enroladinho de salsicha",
    price: 7.00,
    category: 'lanches',
    ingredients: ["Salsicha", "Massa"],
    image: "https://via.placeholder.com/400x300/BC8F8F/FFFFFF?text=Tapioca"
  },
  {
    id: 77,
    name: "BOLO",
    description: "Fatia de bolo",
    price: 6.00,
    category: 'lanches',
    ingredients: ["Bolo caseiro"],
    image: "https://via.placeholder.com/400x300/F5DEB3/FFFFFF?text=Tapioca"
  },
  {
    id: 78,
    name: "CALDO DE MACAXEIRA",
    description: "Caldo quente",
    price: 11.00,
    category: 'lanches',
    ingredients: ["Macaxeira", "Temperos"],
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Tapioca"
  },
  {
    id: 79,
    name: "MACAXEIRA COM CARNE DE SOL",
    description: "Prato completo",
    price: 22.00,
    category: 'lanches',
    ingredients: ["Macaxeira", "Carne de sol"],
    image: "https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Tapioca"
  },
  {
    id: 80,
    name: "MACAXEIRA COM OVO",
    description: "Prato simples",
    price: 13.00,
    category: 'lanches',
    ingredients: ["Macaxeira", "Ovo"],
    image: "https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Tapioca"
  },
  {
    id: 81,
    name: "CUSCUZ COM CARNE DE SOL",
    description: "Prato nordestino",
    price: 22.00,
    category: 'lanches',
    ingredients: ["Cuscuz", "Carne de sol"],
    image: "https://via.placeholder.com/400x300/F4A460/FFFFFF?text=Tapioca"
  },
  {
    id: 82,
    name: "CUSCUZ COM OVO",
    description: "Café da manhã",
    price: 13.00,
    category: 'lanches',
    ingredients: ["Cuscuz", "Ovo"],
    image: "https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Tapioca"
  },
  {
    id: 83,
    name: "MACARRÃO À BOLONHESA",
    description: "Macarrão com molho",
    price: 12.00,
    category: 'lanches',
    ingredients: ["Macarrão", "Molho bolonhesa"],
    image: "https://via.placeholder.com/400x300/B8860B/FFFFFF?text=Tapioca"
  },

  // Bebidas
  {
    id: 84,
    name: "CAFÉ",
    description: "Café tradicional",
    price: 2.50,
    category: 'bebidas',
    ingredients: ["Café"],
    image: "https://via.placeholder.com/400x300/BC8F8F/FFFFFF?text=Tapioca"
  },
  {
    id: 85,
    name: "CAFÉ COM LEITE",
    description: "Café com leite",
    price: 2.50,
    category: 'bebidas',
    ingredients: ["Café", "Leite"],
    image: "https://via.placeholder.com/400x300/F5DEB3/FFFFFF?text=Tapioca"
  },
  {
    id: 86,
    name: "ÁGUA MINERAL",
    description: "Água mineral",
    price: 2.50,
    category: 'bebidas',
    ingredients: ["Água mineral"],
    image: "https://via.placeholder.com/400x300/D2691E/FFFFFF?text=Tapioca"
  },
  {
    id: 87,
    name: "ÁGUA COM GÁS",
    description: "Água com gás",
    price: 3.00,
    category: 'bebidas',
    ingredients: ["Água com gás"],
    image: "https://via.placeholder.com/400x300/CD853F/FFFFFF?text=Tapioca"
  },
  {
    id: 88,
    name: "REFRIGERANTE 1L",
    description: "Coca-cola, Guaraná e Fanta",
    price: 10.00,
    category: 'bebidas',
    ingredients: ["Refrigerante 1L"],
    image: "https://via.placeholder.com/400x300/DEB887/FFFFFF?text=Tapioca"
  },
  {
    id: 89,
    name: "REFRIGERANTE 250 ML",
    description: "Refrigerante pequeno",
    price: 3.50,
    category: 'bebidas',
    ingredients: ["Refrigerante 250ml"],
    image: "https://via.placeholder.com/400x300/F4A460/FFFFFF?text=Tapioca"
  },
  {
    id: 90,
    name: "REFRIGERANTE LATA 350ML",
    description: "Coca-cola, Guaraná e Fanta",
    price: 6.00,
    category: 'bebidas',
    ingredients: ["Refrigerante lata"],
    image: "https://via.placeholder.com/400x300/DAA520/FFFFFF?text=Tapioca"
  },
  {
    id: 91,
    name: "COCA ZERO LATA",
    description: "Coca zero",
    price: 6.00,
    category: 'bebidas',
    ingredients: ["Coca zero"],
    image: "https://fakeimg.pl/400x300/DC143C/FFFFFF?text=Coca%20Zero&font=lobster"
  },
  {
    id: 92,
    name: "SUCO / COPO",
    description: "Suco natural",
    price: 6.00,
    category: 'bebidas',
    ingredients: ["Frutas naturais"],
    image: "https://via.placeholder.com/400x300/BC8F8F/FFFFFF?text=Tapioca"
  },
  {
    id: 93,
    name: "SUCO / JARRA",
    description: "Suco natural jarra",
    price: 10.00,
    category: 'bebidas',
    ingredients: ["Frutas naturais"],
    image: "https://via.placeholder.com/400x300/F5DEB3/FFFFFF?text=Tapioca"
  }
];

export const categories = [
  { id: 'tapioca-3-4', name: 'Tapioca 3 e 4 sabores', icon: '🌮', description: 'As mais completas e saborosas' },
  { id: 'tapioca-2', name: 'Tapioca 2 sabores', icon: '🥙', description: 'Combinações perfeitas' },
  { id: 'crepioca', name: 'Crepioca', icon: '🥞', description: 'Fitness e nutritiva' },
  { id: 'tapioca-simples', name: 'Tapioca Simples', icon: '🫓', description: 'Tradicionais e clássicas' },
  { id: 'tapioca-doces', name: 'Tapioca Doces', icon: '🍰', description: 'Para adoçar seu dia' },
  { id: 'lanches', name: 'Lanches', icon: '🍔', description: 'Variedade para todos' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤', description: 'Para acompanhar' }
];

export const restaurantInfo = {
  name: "Tapioca Recheada de Chapa",
  location: "Moxotó - BA",
  phone: "75 98847-5658",
  instagram: "@tapiocarecheadadechapa",
  pix: "75988475658 - Silvana dos Santos Silva",
  address: "Moxotó, Paulo Afonso - Bahia",
  deliveryArea: "Entregamos para Paulo Afonso e região a partir de Moxotó!"
};