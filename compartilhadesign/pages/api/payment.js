import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // Verifica o token de autenticação
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { planId } = req.body;

    // Validação básica
    if (!planId) {
      return res.status(400).json({ message: 'ID do plano é obrigatório' });
    }

    // Busca o plano no banco de dados
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return res.status(404).json({ message: 'Plano não encontrado' });
    }

    // Aqui você implementaria a integração com o gateway de pagamento
    // Por exemplo, Stripe, PagSeguro, etc.
    // Por enquanto, vamos simular um pagamento bem-sucedido

    // Cria a assinatura do usuário
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planId,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000), // Converte a duração para milissegundos
      },
    });

    // Atualiza o plano do usuário
    await prisma.user.update({
      where: { id: userId },
      data: {
        planId,
        subscriptionId: subscription.id,
      },
    });

    return res.status(200).json({
      message: 'Pagamento processado com sucesso',
      subscription,
    });
  } catch (error) {
    console.error('Erro no processamento do pagamento:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
} 