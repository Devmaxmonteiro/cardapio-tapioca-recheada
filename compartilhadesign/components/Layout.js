import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Layout({ children, title, description }) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Head>
        <title>{title} | Compartilha Design</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#fe8a05" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <header className="bg-white py-6 shadow-card">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="block w-48">
              <Image
                src="/logo.png"
                alt="Logo Compartilha Design"
                width={192}
                height={48}
                priority
              />
            </Link>

            <div className="flex items-center space-x-6">
              {user && (
                <>
                  <span className="text-gray-600">
                    Olá, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-primary hover:text-primary-hover font-medium"
                  >
                    Sair
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        {children}
      </main>
    </>
  );
} 