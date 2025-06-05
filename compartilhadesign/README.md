# Compartilha Design

Plataforma de vetorização de imagens e compartilhamento de designs.

## Tecnologias

- Next.js
- React
- Tailwind CSS
- Prisma
- PostgreSQL
- Stripe
- JWT

## Requisitos

- Node.js 18+
- PostgreSQL
- Conta no Stripe

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/compartilhadesign.git
cd compartilhadesign
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

4. Configure o banco de dados:
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Configuração do Stripe

1. Crie uma conta no [Stripe](https://stripe.com)
2. Obtenha suas chaves de API (pública e secreta)
3. Configure os webhooks no painel do Stripe:
   - URL: `https://seu-dominio.com/api/webhooks/stripe`
   - Eventos: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

## Estrutura do Projeto

```
compartilhadesign/
├── components/         # Componentes React
├── hooks/             # Hooks personalizados
├── pages/             # Páginas e rotas da API
├── prisma/            # Configuração do Prisma
├── public/            # Arquivos estáticos
└── styles/            # Estilos globais
```

## Funcionalidades

- Autenticação de usuários
- Planos de assinatura
- Vetorização de imagens
- Processamento de pagamentos com Stripe
- Dashboard de usuário

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a versão de produção
- `npm run start`: Inicia o servidor de produção
- `npm run lint`: Executa o linter
- `npm run prisma:generate`: Gera o cliente do Prisma
- `npm run prisma:migrate`: Executa as migrações do banco de dados
- `npm run prisma:seed`: Popula o banco de dados com dados iniciais

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes. 