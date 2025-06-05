import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import StripePaymentForm from '../components/StripePaymentForm';
import { useAuth } from '../hooks/useAuth';

export default function Payment() {
  const router = useRouter();
  const { user } = useAuth();
  const { plan } = router.query;
  const [error, setError] = useState('');

  useEffect(() => {
    if (!plan) {
      router.push('/');
    }
  }, [plan, router]);

  const handlePaymentSuccess = () => {
    router.push('/payment/success');
  };

  const handlePaymentError = (error) => {
    setError(error.message);
  };

  if (!user || !plan) {
    return null;
  }

  return (
    <Layout
      title="Pagamento"
      description="Complete seu pagamento para ativar sua assinatura"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Pagamento
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Complete seu pagamento para ativar sua assinatura
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl p-8 shadow-card">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Resumo do pedido</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Plano:</span> {user.plan.name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Valor:</span> R$ {user.plan.price.toFixed(2)}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Duração:</span> {user.plan.duration} dias
              </p>
            </div>
          </div>

          <StripePaymentForm
            plan={user.plan}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      </div>
    </Layout>
  );
} 