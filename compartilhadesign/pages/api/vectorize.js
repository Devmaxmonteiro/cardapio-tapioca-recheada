import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    // Verificar autenticação
    const token = req.cookies.get('token');
    if (!token) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    // Verificar se o usuário tem um plano ativo
    const user = JSON.parse(req.cookies.get('user'));
    if (!user.plan || !user.plan.isActive) {
      return res.status(403).json({ message: 'Plano não ativo' });
    }

    // Processar o upload do arquivo
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) {
      return res.status(400).json({ message: 'Nenhuma imagem enviada' });
    }

    // Gerar nomes únicos para os arquivos
    const originalFileName = `${uuidv4()}-original.png`;
    const vectorizedFileName = `${uuidv4()}-vectorized.svg`;

    // Caminhos dos arquivos
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const originalPath = path.join(uploadDir, originalFileName);
    const vectorizedPath = path.join(uploadDir, vectorizedFileName);

    // Salvar arquivo original
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(originalPath, buffer);

    // Processar a imagem com Sharp
    await sharp(buffer)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFile(vectorizedPath);

    // Retornar URLs dos arquivos
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const originalUrl = `${baseUrl}/uploads/${originalFileName}`;
    const vectorizedUrl = `${baseUrl}/uploads/${vectorizedFileName}`;

    res.status(200).json({
      message: 'Imagem vetorizada com sucesso',
      originalUrl,
      vectorizedUrl,
      downloadUrl: vectorizedUrl,
    });
  } catch (error) {
    console.error('Erro ao processar imagem:', error);
    res.status(500).json({
      message: 'Erro ao processar imagem',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
} 