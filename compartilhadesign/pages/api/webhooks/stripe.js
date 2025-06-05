import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Erro ao verificar assinatura do webhook:', err);
    return res.status(400).json({ message: `Webhook Error: ${err.message}` });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { userId, planId } = session.metadata;

        // Atualizar plano do usuário
        await prisma.user.update({
          where: { id: userId },
          data: {
            plan: {
              update: {
                name: planId,
                isActive: true,
                startDate: new Date(),
                endDate: new Date(Date.now() + getPlanDuration(planId)),
              },
            },
          },
        });

        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const { userId } = subscription.metadata;

        // Atualizar status do plano
        await prisma.user.update({
          where: { id: userId },
          data: {
            plan: {
              update: {
                isActive: subscription.status === 'active',
              },
            },
          },
        });

        break;
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({
      message: 'Erro ao processar webhook',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  } finally {
    await prisma.$disconnect();
  }
}

function getPlanDuration(planId) {
  const durations = {
    monthly: 30 * 24 * 60 * 60 * 1000, // 30 dias
    quarterly: 90 * 24 * 60 * 60 * 1000, // 90 dias
    semiannual: 180 * 24 * 60 * 60 * 1000, // 180 dias
  };

  return durations[planId] || durations.monthly;
} 