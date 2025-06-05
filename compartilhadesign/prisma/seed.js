const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

async function main() {
  try {
    // Primeiro, limpar os planos existentes
    await prisma.plan.deleteMany();

    // Criar planos padrão
    const plans = [
      {
        name: 'Mensal',
        description: 'Plano básico com acesso a todas as funcionalidades por 30 dias',
        features: ['Vetorização ilimitada de imagens', 'Suporte por email', 'Acesso à biblioteca de designs'],
        price: 29.90,
        duration: 30,
        isActive: true,
      },
      {
        name: 'Trimestral',
        description: 'Plano intermediário com 3 meses de acesso e desconto especial',
        features: ['Vetorização ilimitada de imagens', 'Suporte prioritário', 'Acesso à biblioteca de designs', 'Downloads ilimitados'],
        price: 79.90,
        duration: 90,
        isActive: true,
      },
      {
        name: 'Semestral',
        description: 'Melhor custo-benefício com 6 meses de acesso e máximo desconto',
        features: ['Vetorização ilimitada de imagens', 'Suporte VIP', 'Acesso à biblioteca de designs', 'Downloads ilimitados', 'Recursos exclusivos'],
        price: 149.90,
        duration: 180,
        isActive: true,
      },
    ];

    // Criar os novos planos
    for (const plan of plans) {
      await prisma.plan.upsert({
        where: { name: plan.name },
        update: plan,
        create: plan,
      });
    }

    console.log('Planos criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar planos:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 