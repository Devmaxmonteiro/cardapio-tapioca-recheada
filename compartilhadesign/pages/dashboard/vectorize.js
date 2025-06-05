import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../hooks/useAuth';

export default function Vectorize() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Verificar tipo de arquivo
      if (!file.type.match('image.*')) {
        setError('Por favor, selecione apenas arquivos de imagem');
        return;
      }

      // Verificar tamanho do arquivo (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('O arquivo deve ter no máximo 10MB');
        return;
      }

      setSelectedFile(file);
      setError(null);

      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Por favor, selecione uma imagem');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/vectorize', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao processar a imagem');
      }

      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout
      title="Vetorizar Imagem"
      description="Converta suas imagens em vetores"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-card">
          <h1 className="text-3xl font-bold mb-6">Vetorizar Imagem</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione uma imagem
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG ou GIF (MAX. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>
              </div>

              {preview && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}

              {error && (
                <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isProcessing || !selectedFile}
                  className={`px-6 py-3 bg-primary text-white font-semibold rounded-lg ${
                    isProcessing || !selectedFile
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-primary-hover'
                  } transition-colors shadow-md`}
                >
                  {isProcessing ? 'Processando...' : 'Vetorizar'}
                </button>
              </div>
            </div>
          </form>

          {result && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Resultado</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Imagem Original</h3>
                  <img
                    src={preview}
                    alt="Original"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Imagem Vetorizada</h3>
                  <img
                    src={result.vectorizedUrl}
                    alt="Vetorizada"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <a
                  href={result.downloadUrl}
                  download
                  className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Download SVG
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 