import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    const { paymentMethodId, planId } = req.body;

    // Validação básica
    if (!paymentMethodId || !planId) {
      return res.status(400).json({ message: 'Dados incompletos' });
    }

    // Busca o plano no banco de dados
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return res.status(404).json({ message: 'Plano não encontrado' });
    }

    // Busca o usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Cria o cliente no Stripe se não existir
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        metadata: {
          userId: user.id,
        },
      });
      stripeCustomerId = customer.id;

      // Atualiza o usuário com o ID do cliente Stripe
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId },
      });
    }

    // Cria a intenção de pagamento no Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(plan.price * 100), // Converte para centavos
      currency: 'brl',
      customer: stripeCustomerId,
      payment_method: paymentMethodId,
      confirm: true,
      metadata: {
        planId: plan.id,
        userId: user.id,
      },
    });

    // Cria a assinatura no banco de dados
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planId,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000),
        stripePaymentIntentId: paymentIntent.id,
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
      clientSecret: paymentIntent.client_secret,
      subscription,
    });
  } catch (error) {
    console.error('Erro ao criar intenção de pagamento:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
} 