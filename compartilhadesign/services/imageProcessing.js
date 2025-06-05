import { API_CONFIG } from '../config/api';

export async function vectorizeImage(imageBuffer, options = {}) {
  const {
    precision = 5,
    smoothing = 5,
    color = '#000000',
  } = options;

  try {
    const formData = new FormData();
    formData.append('image', new Blob([imageBuffer], { type: 'image/png' }));
    formData.append('precision', precision);
    formData.append('smoothing', smoothing);
    formData.append('color', color);

    const response = await fetch(`${API_CONFIG.deepseek.baseUrl}/vectorize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.deepseek.key}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao vetorizar imagem');
    }

    return await response.text(); // Retorna SVG
  } catch (error) {
    console.error('Erro ao vetorizar imagem:', error);
    throw error;
  }
}

export async function enhanceImage(imageBuffer, options = {}) {
  const {
    sharpness = 5,
    contrast = 5,
    brightness = 0,
    saturation = 0,
  } = options;

  try {
    const formData = new FormData();
    formData.append('image', new Blob([imageBuffer], { type: 'image/png' }));
    formData.append('sharpness', sharpness);
    formData.append('contrast', contrast);
    formData.append('brightness', brightness);
    formData.append('saturation', saturation);

    const response = await fetch(`${API_CONFIG.deepseek.baseUrl}/enhance`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.deepseek.key}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao melhorar imagem');
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error('Erro ao melhorar imagem:', error);
    throw error;
  }
}

export async function analyzeImage(imageBuffer) {
  try {
    const formData = new FormData();
    formData.append('image', new Blob([imageBuffer], { type: 'image/png' }));

    const response = await fetch(`${API_CONFIG.gptzero.baseUrl}/analyze`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.gptzero.key}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao analisar imagem');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao analisar imagem:', error);
    throw error;
  }
}

export async function searchSimilarImages(imageBuffer) {
  try {
    const formData = new FormData();
    formData.append('image', new Blob([imageBuffer], { type: 'image/png' }));

    const response = await fetch(`${API_CONFIG.serpapi.baseUrl}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.serpapi.key}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar imagens similares');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar imagens similares:', error);
    throw error;
  }
}

export async function processImage(file, type = 'vectorize', options = {}) {
  const buffer = await file.arrayBuffer();
  const imageBuffer = Buffer.from(buffer);

  switch (type) {
    case 'vectorize':
      return await vectorizeImage(imageBuffer, options);
    case 'enhance':
      return await enhanceImage(imageBuffer, options);
    case 'analyze':
      return await analyzeImage(imageBuffer);
    case 'search':
      return await searchSimilarImages(imageBuffer);
    default:
      throw new Error('Tipo de processamento inválido');
  }
} 