import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Unauthorized() {
  const router = useRouter();
  const { redirect } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
          <p className="text-gray-600 mb-8">
            Você não tem permissão para acessar esta página.
          </p>
          <div className="space-y-4">
            <Link
              href={redirect || '/'}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Voltar para a página anterior
            </Link>
            <Link
              href="/dashboard"
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Ir para o Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 