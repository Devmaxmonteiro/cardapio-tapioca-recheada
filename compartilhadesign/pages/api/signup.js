import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    console.log('Dados recebidos:', req.body);
    const { firstName, lastName, email, password, cpf, phone, plan } = req.body;

    // Validações básicas
    if (!firstName || !lastName || !email || !password || !cpf || !phone || !plan) {
      console.log('Campos faltando:', {
        firstName: !firstName,
        lastName: !lastName,
        email: !email,
        password: !password,
        cpf: !cpf,
        phone: !phone,
        plan: !plan
      });
      return res.status(400).json({ 
        message: 'Todos os campos são obrigatórios',
        missingFields: {
          firstName: !firstName,
          lastName: !lastName,
          email: !email,
          password: !password,
          cpf: !cpf,
          phone: !phone,
          plan: !plan
        }
      });
    }

    // Verificar se o email já está cadastrado
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está cadastrado' });
    }

    // Verificar se o CPF já está cadastrado
    const existingCpf = await prisma.user.findUnique({
      where: { cpf },
    });

    if (existingCpf) {
      return res.status(400).json({ message: 'Este CPF já está cadastrado' });
    }

    // Verificar se o plano existe
    const existingPlan = await prisma.plan.findUnique({
      where: { id: plan },
    });

    if (!existingPlan) {
      console.log('Plano não encontrado:', plan);
      return res.status(400).json({ message: 'Plano inválido' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o usuário
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        cpf,
        phone,
        planId: plan,
      },
    });

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Retornar sucesso
    res.status(201).json({
      message: 'Conta criada com sucesso',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        plan: existingPlan,
      },
    });
  } catch (error) {
    console.error('Erro ao criar conta:', error);
    res.status(500).json({ 
      message: 'Erro ao criar conta',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    await prisma.$disconnect();
  }
} 