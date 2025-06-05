import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageUploader({ onImageUpload }) {
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [similarImages, setSimilarImages] = useState(null);
  const [processingType, setProcessingType] = useState('vectorize');
  const [options, setOptions] = useState({
    precision: 5,
    smoothing: 5,
    sharpness: 5,
    contrast: 5,
    brightness: 0,
    saturation: 0,
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    setIsLoading(true);
    try {
      // Análise inicial da imagem
      const analysisResult = await onImageUpload(file, 'analyze');
      setAnalysis(analysisResult);

      // Busca de imagens similares
      const similarResult = await onImageUpload(file, 'search');
      setSimilarImages(similarResult);
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
    } finally {
      setIsLoading(false);
    }

    return () => URL.revokeObjectURL(objectUrl);
  }, [onImageUpload]);

  const handleProcess = async (type) => {
    if (!preview) return;

    setIsLoading(true);
    try {
      const result = await onImageUpload(preview, type, options);
      // Atualizar preview com o resultado
      setPreview(result);
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}
        `}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-96 mx-auto rounded-lg shadow-md"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreview(null);
                setAnalysis(null);
                setSimilarImages(null);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              />
            </svg>
            <div className="text-gray-600">
              <span className="font-medium text-primary">
                Clique para fazer upload
              </span>{' '}
              ou arraste e solte
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF até 10MB
            </p>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        )}
      </div>

      {preview && (
        <div className="mt-4 space-y-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleProcess('vectorize')}
              className="btn-primary flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
              </svg>
              <span>Vetorizar Imagem</span>
            </button>

            <button
              onClick={() => handleProcess('enhance')}
              className="btn-primary flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Melhorar Imagem</span>
            </button>
          </div>

          {analysis && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Análise da Imagem</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Resolução</p>
                  <p className="font-medium">{analysis.resolution}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Qualidade</p>
                  <p className="font-medium">{analysis.quality}</p>
                </div>
              </div>
            </div>
          )}

          {similarImages && similarImages.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Imagens Similares</h3>
              <div className="grid grid-cols-3 gap-4">
                {similarImages.slice(0, 3).map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Imagem similar ${index + 1}`}
                    className="rounded-lg shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Configurações de Vetorização</h3>
              <div className="space-y-3">
                <div>
                  <label className="form-label">Precisão</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={options.precision}
                    onChange={(e) => setOptions({ ...options, precision: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="form-label">Suavização</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={options.smoothing}
                    onChange={(e) => setOptions({ ...options, smoothing: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Configurações de Melhoria</h3>
              <div className="space-y-3">
                <div>
                  <label className="form-label">Nitidez</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={options.sharpness}
                    onChange={(e) => setOptions({ ...options, sharpness: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="form-label">Contraste</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={options.contrast}
                    onChange={(e) => setOptions({ ...options, contrast: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 