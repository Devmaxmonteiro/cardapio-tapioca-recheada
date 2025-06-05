import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { planId } = req.body;

    // Verificar autenticação
    const token = req.cookies.get('token');
    if (!token) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    // Obter informações do usuário
    const user = JSON.parse(req.cookies.get('user'));

    // Configurar os preços dos planos
    const prices = {
      monthly: {
        price: 'price_XXXXX', // Substitua pelo ID do preço do plano mensal no Stripe
        name: 'Plano Mensal',
        amount: 3490, // R$ 34,90 em centavos
      },
      quarterly: {
        price: 'price_XXXXX', // Substitua pelo ID do preço do plano trimestral no Stripe
        name: 'Plano Trimestral',
        amount: 8970, // R$ 89,70 em centavos
      },
      semiannual: {
        price: 'price_XXXXX', // Substitua pelo ID do preço do plano semestral no Stripe
        name: 'Plano Semestral',
        amount: 16740, // R$ 167,40 em centavos
      },
    };

    const selectedPlan = prices[planId];
    if (!selectedPlan) {
      return res.status(400).json({ message: 'Plano inválido' });
    }

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: selectedPlan.price,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
      customer_email: user.email,
      metadata: {
        userId: user.id,
        planId: planId,
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    res.status(500).json({
      message: 'Erro ao criar sessão de checkout',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
} 