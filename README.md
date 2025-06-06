# 🌮 Cardápio Digital - Tapioca Recheada de Chapa

Um sistema completo de pedidos online desenvolvido com Next.js 14, TypeScript e TailwindCSS.

## 🚀 Funcionalidades Implementadas

### ✅ **FASE 1 - Sistema de Pedidos Completo**
- **Checkout Multi-etapas**: Coleta de dados pessoais, endereço e forma de pagamento
- **Cálculo de Taxa de Entrega**: Baseado em zonas de entrega configuráveis
- **Sistema de Promoções**: Descontos automáticos, frete grátis e promoções por horário
- **Persistência de Carrinho**: Dados salvos no localStorage
- **Observações por Item**: Cliente pode adicionar observações específicas
- **Integração WhatsApp**: Envio automático de pedidos formatados

### 📊 **Gerenciamento de Dados**
- **Zonas de Entrega**: Centro, Zona Norte, Zona Sul, Zona Rural
- **Tipos de Promoção**: Percentual, Valor fixo, Frete grátis
- **Formas de Pagamento**: PIX, Dinheiro (com troco), Cartão (crédito/débito)
- **Status de Pedidos**: Pendente, Confirmado, Preparando, Pronto, Entregue

### 🎨 **Interface do Usuário**
- **Design Responsivo**: Mobile-first, otimizado para todos os dispositivos
- **Banner de Promoções**: Exibição dinâmica de ofertas ativas
- **Carrinho Aprimorado**: Edição de quantidades e observações
- **Progress Bar**: Acompanhamento visual do processo de checkout
- **Animações**: Transições suaves e feedback visual

### 💡 **Recursos Avançados**
- **Promoções Inteligentes**: Aplicação automática baseada em horário e valor
- **Validação de Entrega**: Verificação de zonas de entrega ativas
- **Cálculos Dinâmicos**: Subtotal, taxa de entrega, descontos em tempo real
- **Mensagens Formatadas**: Templates profissionais para WhatsApp

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS
- **Ícones**: Lucide React
- **Estado**: Context API + useReducer
- **Persistência**: localStorage

## 📱 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout global
│   └── globals.css        # Estilos globais
├── components/            # Componentes reutilizáveis
│   ├── Cart.tsx           # Carrinho de compras
│   ├── Checkout.tsx       # Sistema de checkout
│   ├── PromotionBanner.tsx # Banner de promoções
│   ├── MenuItem.tsx       # Item do cardápio
│   └── ...               # Outros componentes
├── context/               # Gerenciamento de estado
│   └── CartContext.tsx    # Context do carrinho
├── data/                  # Dados da aplicação
│   ├── menu.ts           # Itens do cardápio
│   └── delivery.ts       # Zonas e promoções
├── types/                 # Definições TypeScript
│   └── menu.ts           # Interfaces e tipos
└── utils/                 # Utilitários
    └── pdfGenerator.ts   # Geração de PDF
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <repository-url>

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### Build para Produção
```bash
npm run build
npm start
```

## ⚙️ Configuração

### Zonas de Entrega
Edite `src/data/delivery.ts` para configurar:
- Bairros atendidos
- Valores de taxa de entrega
- Tempo estimado de entrega

```typescript
export const deliveryZones: DeliveryZone[] = [
  {
    id: 'zone-1',
    name: 'Centro',
    neighborhoods: ['Centro', 'Centro Histórico'],
    fee: 3.00,
    estimatedTime: 20,
    isActive: true
  }
  // ...
];
```

### Promoções
Configure promoções automáticas:

```typescript
export const activePromotions: Promotion[] = [
  {
    id: 'promo-1',
    name: 'Frete Grátis',
    type: 'freeDelivery',
    minOrderValue: 30.00,
    conditions: {
      dayOfWeek: [0, 1, 2, 3, 4, 5, 6]
    }
  }
];
```

## 📈 Funcionalidades de Negócio

### Sistema de Promoções
- **Frete Grátis**: Automático para pedidos acima de R$ 30
- **Desconto Percentual**: 10% para pedidos acima de R$ 50
- **Happy Hour**: 15% das 14h às 17h (seg-sex)
- **Promoções por Horário**: Configuráveis por dia da semana

### Fluxo de Pedidos
1. **Seleção de Items**: Adicionar produtos ao carrinho
2. **Observações**: Cliente pode personalizar cada item
3. **Dados Pessoais**: Nome, telefone, email (opcional)
4. **Endereço**: Validação automática de zona de entrega
5. **Pagamento**: Seleção de forma de pagamento
6. **Confirmação**: Revisão final do pedido
7. **Envio**: Pedido formatado enviado via WhatsApp

### Cálculos Automáticos
- **Subtotal**: Soma dos itens no carrinho
- **Taxa de Entrega**: Baseada na zona do endereço
- **Descontos**: Aplicação automática de promoções ativas
- **Total**: Cálculo final com todos os valores

## 🔧 Personalização

### Dados do Restaurante
Edite `src/data/menu.ts`:

```typescript
export const restaurantInfo = {
  name: "Tapioca Recheada de Chapa",
  phone: "75988475658",
  instagram: "@tapiocadachapa",
  pix: "75988475658"
};
```

### Cores e Tema
Configure no `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#D97706',
        600: '#B45309',
        700: '#92400E'
      }
    }
  }
}
```

## 📊 Análise de Escalabilidade

### Pontos Fortes
- **Arquitetura Modular**: Componentes reutilizáveis e bem organizados
- **Gerenciamento de Estado**: Context API escalável para múltiplas funcionalidades
- **TypeScript**: Tipagem forte previne erros e facilita manutenção
- **Performance**: Next.js 14 com otimizações automáticas

### Próximos Passos Recomendados
1. **Backend Integration**: API routes para persistência de pedidos
2. **Banco de Dados**: PostgreSQL/MySQL para dados permanentes
3. **Dashboard Admin**: Interface para gerenciar pedidos e cardápio
4. **Notificações**: Push notifications para status de pedidos
5. **Analytics**: Tracking de conversão e comportamento do usuário

### Melhorias de Produção
- **Error Boundary**: Tratamento de erros global
- **Loading States**: Skeleton screens para melhor UX
- **PWA**: Service Workers para funcionamento offline
- **SEO**: Meta tags dinâmicas e structured data
- **Testing**: Unit tests e E2E tests

## 📱 Integração WhatsApp

O sistema gera automaticamente mensagens formatadas para WhatsApp com:
- Detalhes completos do pedido
- Dados do cliente e endereço
- Forma de pagamento selecionada
- Tempo estimado de entrega
- Total com breakdown de valores

## 💳 Formas de Pagamento

### PIX (Recomendado)
- Chave PIX configurável
- Pagamento instantâneo
- Melhor conversão

### Dinheiro
- Opção de troco
- Validação de valor mínimo
- Pagamento na entrega

### Cartão
- Crédito ou débito
- Pagamento na entrega
- Maquininha do entregador

## 📞 Suporte

Para suporte técnico ou dúvidas sobre implementação:
- Email: [seu-email@exemplo.com]
- WhatsApp: [seu-numero]
- Documentação: [link-documentacao]

---

**Desenvolvido com ❤️ para o crescimento do seu negócio de delivery**
