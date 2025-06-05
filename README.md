<<<<<<< HEAD
# 🌮 Cardápio Digital - Tapioca Recheada de Chapa

Um cardápio digital moderno e responsivo para a Tapioca Recheada de Chapa, com funcionalidade de geração de PDF.

## ✨ Funcionalidades

- 📱 **Design Responsivo**: Funciona perfeitamente em dispositivos móveis, tablets e desktop
- 🎨 **Interface Moderna**: Design atrativo com cores temáticas e animações suaves
- 📄 **Geração de PDF**: Converta o cardápio digital em PDF para impressão ou compartilhamento
- 🖼️ **Suporte a Imagens**: Cada item do cardápio pode ter sua própria foto
- 🛒 **Carrinho de Compras**: Sistema completo para seleção de itens e quantidades
- 📱 **Integração WhatsApp**: Envio automático do pedido via WhatsApp
- 💰 **Informações de Pagamento**: PIX integrado para facilitar os pedidos
- 🏷️ **Categorização**: Itens organizados por categorias (tapiocas e bebidas)
- 🔍 **Ingredientes Destacados**: Tags visuais para cada ingrediente
- 🔔 **Notificações**: Feedback visual quando itens são adicionados ao carrinho

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. **Clone ou baixe o projeto**
2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Abra o navegador em:** `http://localhost:3000`

### Para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js 13+
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── MenuHeader.tsx     # Cabeçalho do cardápio
│   ├── MenuItem.tsx       # Item individual do cardápio
│   ├── MenuCategory.tsx   # Categoria de itens
│   └── PDFButton.tsx      # Botão para gerar PDF
├── data/                  # Dados do cardápio
│   └── menu.ts           # Itens e informações do restaurante
├── types/                 # Tipos TypeScript
│   └── menu.ts           # Interfaces e tipos
└── utils/                 # Utilitários
    └── pdfGenerator.ts   # Geração de PDF
```

## 🖼️ Adicionando Imagens

Para adicionar fotos aos itens do cardápio:

1. **Crie a pasta `public/images/`**
2. **Adicione as imagens com os nomes especificados no arquivo `src/data/menu.ts`**
3. **Formatos suportados:** JPG, PNG, WebP
4. **Tamanho recomendado:** 400x300px para melhor performance

### Exemplo de estrutura de imagens:
```
public/
└── images/
    ├── tapioca-delicia.jpg
    ├── tapioca-pe-sogra.jpg
    ├── tapioca-racudo.jpg
    └── ...
```

## ⚙️ Personalização

### Modificar Dados do Restaurante

Edite o arquivo `src/data/menu.ts`:

```typescript
export const restaurantInfo: RestaurantInfo = {
  name: "Seu Restaurante",
  phone: "75 99999-9999",
  instagram: "@seurestaurante",
  pixKey: "seupix@email.com",
  pixName: "Seu Nome"
};
```

### Adicionar/Modificar Itens do Cardápio

No mesmo arquivo, modifique o array `menuItems`:

```typescript
{
  id: 1,
  name: "NOME DO ITEM",
  description: "Descrição detalhada",
  price: 15.00,
  category: 'tapioca-3-4', // ou 'tapioca-2'
  ingredients: ["ingrediente1", "ingrediente2"],
  image: "/images/foto-item.jpg",
  isSpecial: false // true para itens especiais
}
```

### Personalizar Cores

Modifique o arquivo `tailwind.config.js` para alterar as cores do tema:

```javascript
colors: {
  primary: {
    // Suas cores primárias
  },
  secondary: {
    // Suas cores secundárias
  }
}
```

## 📱 Funcionalidades do Cardápio Digital

- **Visualização Responsiva**: Adapta-se automaticamente ao tamanho da tela
- **Carrinho de Compras**: Botão flutuante no canto inferior esquerdo com contador
- **Botão de PDF Flutuante**: Sempre visível no canto inferior direito
- **Sistema de Pedidos**: Adicione itens, ajuste quantidades e envie via WhatsApp
- **Informações de Contato**: Telefone e Instagram destacados no cabeçalho
- **Preços Formatados**: Exibição automática em Real brasileiro
- **Tags de Ingredientes**: Visualização clara dos componentes de cada tapioca
- **Itens Especiais**: Destaque visual para promoções e itens únicos
- **Bebidas Incluídas**: Seção completa de bebidas para acompanhar as tapiocas

## 🛠️ Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática para maior segurança
- **Tailwind CSS**: Framework CSS utilitário
- **jsPDF**: Geração de arquivos PDF
- **html2canvas**: Conversão de HTML para imagem
- **Lucide React**: Ícones modernos

## 🛒 Sistema de Pedidos

### Como Fazer um Pedido:

1. **Navegue pelo cardápio** e clique em "Adicionar" nos itens desejados
2. **Abra o carrinho** clicando no ícone flutuante (canto inferior esquerdo)
3. **Ajuste quantidades** usando os botões + e - 
4. **Revise seu pedido** e o valor total
5. **Clique em "Enviar Pedido via WhatsApp"**
6. **Será redirecionado** para o WhatsApp com a mensagem pronta
7. **Informe seu endereço** e confirme o pedido

### Funcionalidades do Carrinho:

- ➕ **Adicionar/Remover itens** com facilidade
- 🔢 **Controle de quantidade** individual por item
- 💰 **Cálculo automático** do valor total
- 📱 **Mensagem formatada** para WhatsApp
- 🗑️ **Limpar carrinho** quando necessário

## 📄 Geração de PDF

### ⚠️ Importante sobre o PDF

O **PDF é apenas para visualização e impressão** - não é interativo. Para fazer pedidos, os clientes devem:

1. **Escanear o QR Code** incluído no PDF
2. **Acessar o cardápio digital** no navegador
3. **Usar o sistema de carrinho** para fazer pedidos

### Funcionalidades do PDF:

- ✅ **Visualização completa** do cardápio
- ✅ **QR Code integrado** que leva ao cardápio digital
- ✅ **Instruções claras** de como fazer pedidos
- ✅ **Informações de contato** destacadas
- ✅ **Formatação otimizada** para impressão
- ✅ **Download automático** do arquivo

### Diferenças entre PDF e Cardápio Digital:

| Funcionalidade | PDF | Cardápio Digital |
|---|---|---|
| Visualizar itens | ✅ | ✅ |
| Ver preços | ✅ | ✅ |
| Adicionar ao carrinho | ❌ | ✅ |
| Fazer pedidos | ❌ | ✅ |
| Enviar via WhatsApp | ❌ | ✅ |
| Imprimir | ✅ | ✅ |
| Compartilhar | ✅ | ✅ |

## 🎨 Design e UX

- **Paleta de Cores**: Tons de laranja e vermelho que remetem à culinária nordestina
- **Tipografia**: Inter font para legibilidade moderna
- **Animações**: Transições suaves para melhor experiência
- **Acessibilidade**: Contraste adequado e navegação intuitiva

## 📞 Suporte

Para dúvidas ou sugestões sobre o cardápio digital, entre em contato através dos canais disponíveis no próprio cardápio.

---

**Desenvolvido com ❤️ para a Tapioca Recheada de Chapa** 
=======
# cardapio-tapioca-recheada
>>>>>>> a5c751ef284bf4bb86a305cd4742434aaf325786
