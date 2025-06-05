import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../hooks/useAuth';

export default function PaymentSuccess() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <Layout
      title="Pagamento realizado"
      description="Seu pagamento foi realizado com sucesso"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4">
          Pagamento realizado com sucesso!
        </h1>

        <p className="text-gray-600 mb-8">
          Sua assinatura foi ativada com sucesso. Agora você tem acesso completo ao plano {user.plan.name}.
        </p>

        <div className="bg-white rounded-xl p-8 shadow-card mb-8">
          <h2 className="text-xl font-semibold mb-4">Resumo da assinatura</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Plano</span>
              <span className="font-medium">{user.plan.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Valor</span>
              <span className="font-medium">R$ {user.plan.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duração</span>
              <span className="font-medium">{user.plan.duration} dias</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <a
            href="/"
            className="inline-block w-full py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-md hover:shadow-lg"
          >
            Ir para o início
          </a>
          <a
            href="/dashboard"
            className="inline-block w-full py-3 px-6 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg"
          >
            Ir para o dashboard
          </a>
        </div>
      </div>
    </Layout>
  );
} 