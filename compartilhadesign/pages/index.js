import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Criar conta | Compartilha Design</title>
        <meta name="description" content="Crie sua conta no Compartilha Design e tenha acesso às melhores ferramentas de design" />
        <meta name="theme-color" content="#fe8a05" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <header className="bg-white py-6 shadow-card">
        <nav className="container mx-auto px-4" aria-label="Navegação principal">
          <Link href="/" className="block w-48 mx-auto">
            <Image
              src="/logo.png"
              alt="Logo Compartilha Design"
              width={192}
              height={48}
              priority
            />
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16" aria-labelledby="plans-title">
          <h1 id="plans-title" className="text-3xl font-bold mb-4 text-center">
            Planos disponíveis
          </h1>
          <p className="text-gray-600 text-center mb-12">
            Escolha o plano que melhor se adapta às suas necessidades
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Mensal */}
            <article className="bg-white rounded-xl p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              <header className="text-center mb-8">
                <h2 className="text-2xl font-bold">Mensal</h2>
                <div className="mt-4">
                  <p className="text-4xl font-bold text-primary">R$ 34,90</p>
                  <p className="text-sm text-gray-600">/mês</p>
                </div>
                <Link
                  href="/signup?plan=monthly"
                  className="mt-6 w-full py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-md hover:shadow-lg inline-block"
                  aria-label="Escolher plano mensal"
                >
                  ESCOLHER
                </Link>
              </header>
              
              <ul className="space-y-4">
                <li className="flex items-center gap-4 pb-2 border-b border-gray-200">
                  <Image
                    src="/freepik-icon.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                  <span>Freepik - 10 downloads diários</span>
                </li>
                {/* ... outros recursos ... */}
              </ul>
            </article>

            {/* Plano Trimestral */}
            <article className="bg-white rounded-xl p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full">
                  Mais Popular
                </span>
              </div>
              <header className="text-center mb-8">
                <h2 className="text-2xl font-bold">Trimestral</h2>
                <div className="mt-4">
                  <p className="text-4xl font-bold text-primary">R$ 89,70</p>
                  <p className="text-sm text-gray-600">Equivalente a R$ 29,90/mês</p>
                </div>
                <Link
                  href="/signup?plan=quarterly"
                  className="mt-6 w-full py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-md hover:shadow-lg inline-block"
                  aria-label="Escolher plano trimestral"
                >
                  ESCOLHER
                </Link>
              </header>
              {/* ... recursos do plano trimestral ... */}
            </article>

            {/* Plano Semestral */}
            <article className="bg-white rounded-xl p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              <header className="text-center mb-8">
                <h2 className="text-2xl font-bold">Semestral</h2>
                <div className="mt-4">
                  <p className="text-4xl font-bold text-primary">R$ 167,40</p>
                  <p className="text-sm text-gray-600">Equivalente a R$ 27,90/mês</p>
                </div>
                <Link
                  href="/signup?plan=semiannual"
                  className="mt-6 w-full py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-md hover:shadow-lg inline-block"
                  aria-label="Escolher plano semestral"
                >
                  ESCOLHER
                </Link>
              </header>
              {/* ... recursos do plano semestral ... */}
            </article>
          </div>
        </section>
      </main>
    </>
  );
} 