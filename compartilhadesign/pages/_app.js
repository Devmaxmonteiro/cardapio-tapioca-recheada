import { AuthProvider } from '../hooks/useAuth';
import { Elements } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/globals.css';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    // Inicializar o Stripe apenas no cliente e se a chave estiver definida
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
    }
  }, []);

  return (
    <AuthProvider>
      {stripePromise ? (
        <Elements stripe={stripePromise}>
          <Component {...pageProps} />
        </Elements>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}

export default MyApp; 