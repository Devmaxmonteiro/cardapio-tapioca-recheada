import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token não fornecido' });
    }

    // Verificar se o refresh token é válido
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // Buscar usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Gerar novo token de acesso
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        roles: user.roles || [],
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Gerar novo refresh token
    const newRefreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.status(200).json({
      token,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
} 