import { MenuItem, MenuCategory, RestaurantInfo } from '@/types/menu';

export const restaurantInfo: RestaurantInfo = {
  name: "Tapioca Recheada de Chapa",
  phone: "75 98847-5658",
  instagram: "@tapiocarecheadadechapa",
  pixKey: "75988475658",
  pixName: "Silvana dos Santos Silva"
};

export const menuItems: MenuItem[] = [
  // Tapioca 3 e 4 sabores
  {
    id: 1,
    name: "DELÍCIA",
    description: "Queijo, côco e manteiga",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "côco", "manteiga"],
    image: "/images/tapioca-delicia.jpg"
  },
  {
    id: 2,
    name: "PÉ DE SOGRA",
    description: "Queijo, ovo e frango",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "ovo", "frango"],
    image: "/images/tapioca-pe-sogra.jpg"
  },
  {
    id: 3,
    name: "RACUDO",
    description: "Queijo, ovo, carne de sol e cream cheese",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "ovo", "carne de sol", "cream cheese"],
    image: "/images/tapioca-racudo.jpg"
  },
  {
    id: 4,
    name: "SERTANEJA",
    description: "Queijo, ovo e carne de sol",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "ovo", "carne de sol"],
    image: "/images/tapioca-sertaneja.jpg"
  },
  {
    id: 5,
    name: "JOÃO GRILO",
    description: "Queijo, ovo, calabresa e cream cheese",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "ovo", "calabresa", "cream cheese"],
    image: "/images/tapioca-joao-grilo.jpg"
  },
  {
    id: 6,
    name: "CAIPIRA",
    description: "Queijo, ovo e calabresa",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "ovo", "calabresa"],
    image: "/images/tapioca-caipira.jpg"
  },
  {
    id: 7,
    name: "SEVERINA NORDESTINA",
    description: "Queijo, carne de sol, frango e cream cheese",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "carne de sol", "frango", "cream cheese"],
    image: "/images/tapioca-severina.jpg"
  },
  {
    id: 8,
    name: "LAMPIÃO",
    description: "Queijo, frango e carne de sol",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "frango", "carne de sol"],
    image: "/images/tapioca-lampiao.jpg"
  },
  {
    id: 9,
    name: "CAATINGA",
    description: "Queijo, carne de sol, frango e ovo",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "carne de sol", "frango", "ovo"],
    image: "/images/tapioca-caatinga.jpg"
  },
  {
    id: 10,
    name: "ROCEIRA",
    description: "Queijo, frango e calabresa",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "frango", "calabresa"],
    image: "/images/tapioca-roceira.jpg"
  },
  {
    id: 11,
    name: "RISCA FACA",
    description: "Queijo, frango e catupiry",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "frango", "catupiry"],
    image: "/images/tapioca-risca-faca.jpg"
  },
  {
    id: 12,
    name: "DONA FLOR",
    description: "Queijo, frango e milho",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "frango", "milho"],
    image: "/images/tapioca-dona-flor.jpg"
  },
  {
    id: 13,
    name: "VIXE MARIA",
    description: "Queijo, frango, milho e cream cheese",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "frango", "milho", "cream cheese"],
    image: "/images/tapioca-vixe-maria.jpg"
  },
  {
    id: 14,
    name: "CRENDEUSPAI",
    description: "Queijo, carne de sol e catupiry",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "carne de sol", "catupiry"],
    image: "/images/tapioca-crendeuspai.jpg"
  },
  {
    id: 15,
    name: "FLOR DE MANDACARU",
    description: "Queijo, bacon, frango e cream cheese",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "bacon", "frango", "cream cheese"],
    image: "/images/tapioca-flor-mandacaru.jpg"
  },
  {
    id: 16,
    name: "ASA BRANCA",
    description: "Queijo, milho, frango e bacon",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "milho", "frango", "bacon"],
    image: "/images/tapioca-asa-branca.jpg"
  },
  {
    id: 17,
    name: "LASQUEIRA",
    description: "Queijo, bacon e frango",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "bacon", "frango"],
    image: "/images/tapioca-lasqueira.jpg"
  },
  {
    id: 18,
    name: "AI SIM",
    description: "Queijo, carne de sol e bacon",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "carne de sol", "bacon"],
    image: "/images/tapioca-ai-sim.jpg"
  },
  {
    id: 19,
    name: "TAPIOCA SABOR PIZZA",
    description: "Queijo, presunto, tomate, cebola e orégano",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "presunto", "tomate", "cebola", "orégano"],
    image: "/images/tapioca-pizza.jpg"
  },
  {
    id: 20,
    name: "MARIA BONITA",
    description: "Queijo, carne de sol e banana terra caramelizada na manteiga",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "carne de sol", "banana terra caramelizada"],
    image: "/images/tapioca-maria-bonita.jpg"
  },
  {
    id: 21,
    name: "MEU XODÓ",
    description: "Queijo, purê de macaxeira e carne de sol",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "purê de macaxeira", "carne de sol"],
    image: "/images/tapioca-meu-xodo.jpg"
  },
  {
    id: 22,
    name: "CABRA MACHO",
    description: "Queijo, purê de macaxeira e frango",
    price: 15.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "purê de macaxeira", "frango"],
    image: "/images/tapioca-cabra-macho.jpg"
  },
  {
    id: 23,
    name: "SERTÃO",
    description: "Queijo, purê de macaxeira, carne de sol e banana terra",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo", "purê de macaxeira", "carne de sol", "banana terra"],
    image: "/images/tapioca-sertao.jpg"
  },
  {
    id: 24,
    name: "TUDÃO",
    description: "Até 7 sabores",
    price: 19.00,
    category: 'tapioca-3-4',
    ingredients: ["até 7 sabores à escolha"],
    isSpecial: true,
    image: "/images/tapioca-tudao.jpg"
  },
  {
    id: 25,
    name: "TAPIOCA À MODA DO CLIENTE",
    description: "Queijo coalho ou mussarela (salada opcional)",
    price: 16.00,
    category: 'tapioca-3-4',
    ingredients: ["queijo coalho ou mussarela", "salada opcional"],
    isSpecial: true,
    image: "/images/tapioca-moda-cliente.jpg"
  },

  // Tapioca 2 sabores
  {
    id: 26,
    name: "MARMENINO",
    description: "Manteiga e côco",
    price: 9.00,
    category: 'tapioca-2',
    ingredients: ["manteiga", "côco"],
    image: "/images/tapioca-marmenino.jpg"
  },
  {
    id: 27,
    name: "VIRGULINO",
    description: "Queijo e côco",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["queijo", "côco"],
    image: "/images/tapioca-virgulino.jpg"
  },
  {
    id: 28,
    name: "OXENTE",
    description: "Queijo e ovo",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["queijo", "ovo"],
    image: "/images/tapioca-oxente.jpg"
  },
  {
    id: 29,
    name: "MISTA",
    description: "Queijo e presunto",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["queijo", "presunto"],
    image: "/images/tapioca-mista.jpg"
  },
  {
    id: 30,
    name: "VITÓRIA",
    description: "Queijo e frango",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["queijo", "frango"],
    image: "/images/tapioca-vitoria.jpg"
  },
  {
    id: 31,
    name: "NORDESTINA",
    description: "Queijo e carne de sol",
    price: 14.00,
    category: 'tapioca-2',
    ingredients: ["queijo", "carne de sol"],
    image: "/images/tapioca-nordestina.jpg"
  },
  {
    id: 32,
    name: "PELEJA",
    description: "Queijo e calabresa",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["queijo", "calabresa"],
    image: "/images/tapioca-peleja.jpg"
  },
  {
    id: 33,
    name: "SUSTANÇA",
    description: "Queijo e bacon",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["queijo", "bacon"],
    image: "/images/tapioca-sustanca.jpg"
  },
  {
    id: 34,
    name: "ARRETADA",
    description: "Carne de sol e frango",
    price: 14.00,
    category: 'tapioca-2',
    ingredients: ["carne de sol", "frango"],
    image: "/images/tapioca-arretada.jpg"
  },
  {
    id: 35,
    name: "RACUDO",
    description: "Carne de sol e catupiry",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["carne de sol", "catupiry"],
    image: "/images/tapioca-racudo-2.jpg"
  },
  {
    id: 36,
    name: "OXE",
    description: "Frango e catupiry",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["frango", "catupiry"],
    image: "/images/tapioca-oxe.jpg"
  },
  {
    id: 37,
    name: "MATUTO",
    description: "Frango e ovo",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["frango", "ovo"],
    image: "/images/tapioca-matuto.jpg"
  },
  {
    id: 38,
    name: "VALEI-ME",
    description: "Bacon e carne",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["bacon", "carne"],
    image: "/images/tapioca-valei-me.jpg"
  },
  {
    id: 39,
    name: "ZEMARUA",
    description: "Frango e cream cheese",
    price: 13.00,
    category: 'tapioca-2',
    ingredients: ["frango", "cream cheese"],
    image: "/images/tapioca-zemarua.jpg"
  },

  // Bebidas
  {
    id: 40,
    name: "REFRIGERANTE LATA",
    description: "Coca-Cola, Guaraná, Fanta",
    price: 4.00,
    category: 'bebidas',
    ingredients: ["refrigerante gelado"],
    image: "/images/refrigerante-lata.jpg"
  },
  {
    id: 41,
    name: "REFRIGERANTE 600ML",
    description: "Coca-Cola, Guaraná, Fanta",
    price: 6.00,
    category: 'bebidas',
    ingredients: ["refrigerante gelado"],
    image: "/images/refrigerante-600ml.jpg"
  },
  {
    id: 42,
    name: "ÁGUA MINERAL",
    description: "Água mineral gelada 500ml",
    price: 2.50,
    category: 'bebidas',
    ingredients: ["água mineral"],
    image: "/images/agua-mineral.jpg"
  },
  {
    id: 43,
    name: "SUCO NATURAL",
    description: "Laranja, Acerola, Cajá, Maracujá",
    price: 8.00,
    category: 'bebidas',
    ingredients: ["fruta natural", "açúcar", "gelo"],
    image: "/images/suco-natural.jpg"
  },
  {
    id: 44,
    name: "VITAMINA",
    description: "Banana, Mamão, Abacate com leite",
    price: 10.00,
    category: 'bebidas',
    ingredients: ["fruta", "leite", "açúcar"],
    image: "/images/vitamina.jpg"
  },
  {
    id: 45,
    name: "CAFÉ",
    description: "Café passado na hora",
    price: 3.00,
    category: 'bebidas',
    ingredients: ["café", "açúcar"],
    image: "/images/cafe.jpg"
  },
  {
    id: 46,
    name: "ÁGUA DE COCO",
    description: "Água de coco natural gelada",
    price: 5.00,
    category: 'bebidas',
    ingredients: ["água de coco natural"],
    image: "/images/agua-coco.jpg"
  }
];

export const menuCategories: MenuCategory[] = [
  {
    id: 'tapioca-3-4',
    name: 'Tapioca 3 e 4 sabores',
    description: 'Queijo coalho ou mussarela (salada opcional)',
    items: menuItems.filter(item => item.category === 'tapioca-3-4')
  },
  {
    id: 'tapioca-2',
    name: 'Tapioca 2 sabores',
    description: 'Queijo coalho ou mussarela (salada opcional)',
    items: menuItems.filter(item => item.category === 'tapioca-2')
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    description: 'Refrescantes e saborosas para acompanhar sua tapioca',
    items: menuItems.filter(item => item.category === 'bebidas')
  }
]; 