import Link from 'next/link';

export default function PlanCard({ plan, isPopular = false }) {
  const features = JSON.parse(plan.features);

  return (
    <div className={`bg-white rounded-xl p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${isPopular ? 'border-2 border-primary relative' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full">
            Mais Popular
          </span>
        </div>
      )}
      
      <header className="text-center mb-8">
        <h2 className="text-2xl font-bold">{plan.name}</h2>
        <div className="mt-4">
          <p className="text-4xl font-bold text-primary">
            R$ {plan.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            {plan.duration === 30 ? '/mês' : 
             plan.duration === 90 ? 'Equivalente a R$ ' + (plan.price / 3).toFixed(2) + '/mês' :
             'Equivalente a R$ ' + (plan.price / 6).toFixed(2) + '/mês'}
          </p>
        </div>
        <Link 
          href={`/signup?plan=${plan.id}`}
          className="mt-6 w-full inline-block py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-md hover:shadow-lg text-center"
        >
          ESCOLHER
        </Link>
      </header>
      
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-4 pb-2 border-b border-gray-200 last:border-0">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 