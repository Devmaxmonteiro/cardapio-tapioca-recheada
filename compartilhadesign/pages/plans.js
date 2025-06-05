import { useEffect, useState } from 'react';
import PlanCard from '../components/PlanCard';
import Head from 'next/head';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await fetch('/api/plans');
        if (!response.ok) {
          throw new Error('Erro ao carregar planos');
        }
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  return (
    <>
      <Head>
        <title>Planos - Compartilha Design</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Escolha o melhor plano para você</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre o plano perfeito para suas necessidades. Todos os planos incluem acesso ilimitado à nossa biblioteca de designs.
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando planos...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <PlanCard 
                  key={plan.id} 
                  plan={plan} 
                  isPopular={plan.isPopular}
                />
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">Precisa de ajuda para escolher?</p>
            <a 
              href="mailto:suporte@compartilhadesign.com.br" 
              className="text-primary hover:text-primary-hover font-semibold"
            >
              Fale com nosso time
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 