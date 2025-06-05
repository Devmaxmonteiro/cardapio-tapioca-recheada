import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const plans = await prisma.plan.findMany({
      orderBy: {
        price: 'asc'
      }
    });

    return res.status(200).json(plans);
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    return res.status(500).json({ message: 'Erro ao buscar planos' });
  }
} 