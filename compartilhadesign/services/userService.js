import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createLogger } from '@/utils/logger';

const prisma = new PrismaClient();
const logger = createLogger('userService');

export async function createUser(userData) {
    try {
        // Hash da senha
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Cria o usuário no banco de dados
        const user = await prisma.user.create({
            data: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: hashedPassword,
                cpf: userData.cpf,
                phone: userData.phone,
                affiliateCode: userData.affiliateCode || null,
                selectedPlan: userData.selectedPlan,
                status: 'active',
                role: 'user'
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                cpf: true,
                phone: true,
                status: true,
                role: true,
                createdAt: true
            }
        });

        logger.info('Usuário criado com sucesso', { userId: user.id });
        return user;

    } catch (error) {
        logger.error('Erro ao criar usuário', { error: error.message });
        throw error;
    }
} 